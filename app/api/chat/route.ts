import {
  CHAT_MODELS,
  OPENROUTER_URL,
  MAX_OUTPUT_TOKENS,
  MAX_INPUT_CHARS,
  MAX_ASSISTANT_CHARS,
  UPSTREAM_TIMEOUT_MS,
  GUARD_PROMPT,
  buildSystemPrompt,
  isOriginAllowed,
} from "@/lib/anthropic";

export const runtime = "nodejs";

// --- Tiny in-memory IP rate limiter (per server instance) -------------------
// Good enough to stop casual abuse of the public demo. Note this is per warm
// instance: on serverless the real ceiling is higher than it looks. For
// serious scale use a shared store (e.g. Upstash) or the platform WAF.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Evict stale buckets so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

/**
 * Client-controlled headers are worthless for rate limiting: anyone can rotate
 * `x-forwarded-for` and get a fresh bucket per request. Prefer the header the
 * platform sets itself, and when falling back to `x-forwarded-for` take the
 * LAST hop (appended by the proxy closest to us) rather than the first, which
 * is whatever the client claimed.
 */
function clientIp(req: Request): string {
  const platform =
    req.headers.get("x-vercel-forwarded-for") ||
    req.headers.get("cf-connecting-ip");
  if (platform) return platform.split(",")[0].trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chat is not configured. Set OPENROUTER_API_KEY." },
      { status: 503 }
    );
  }

  // Browsers always send Origin on POST, so requiring it blocks both other
  // sites reusing this endpoint and plain scripted calls. Left open in dev so
  // curl still works locally.
  if (
    process.env.NODE_ENV === "production" &&
    !isOriginAllowed(req.headers.get("origin"))
  ) {
    return Response.json({ error: "Not allowed." }, { status: 403 });
  }

  if (rateLimited(clientIp(req))) {
    return Response.json(
      { error: "Too many messages — give it a minute and try again." },
      { status: 429 }
    );
  }

  let messages: IncomingMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("no messages");
    }
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Trim history + enforce input size. Assistant turns get a tighter cap: they
  // arrive from the browser and cannot be verified, so they are a smuggling
  // route for fabricated instructions.
  const trimmed = messages.slice(-10).map((m) => {
    const isAssistant = m.role === "assistant";
    return {
      role: isAssistant ? ("assistant" as const) : ("user" as const),
      content: String(m.content ?? "").slice(
        0,
        isAssistant ? MAX_ASSISTANT_CHARS : MAX_INPUT_CHARS
      ),
    };
  });
  const totalChars = trimmed.reduce((n, m) => n + m.content.length, 0);
  if (totalChars > MAX_INPUT_CHARS * 4) {
    return Response.json({ error: "Message too long." }, { status: 413 });
  }

  // System prompt, then history, then the guard: the last instruction the
  // model reads is ours rather than a forged assistant turn.
  const apiMessages = [
    { role: "system", content: buildSystemPrompt() },
    ...trimmed,
    { role: "system", content: GUARD_PROMPT },
  ];

  // Abort upstream when the client hangs up or a model stalls, so we stop
  // paying for tokens nobody will read.
  const ac = new AbortController();
  const onClientAbort = () => ac.abort();
  req.signal.addEventListener("abort", onClientAbort);
  const timeout = setTimeout(() => ac.abort(), UPSTREAM_TIMEOUT_MS);
  const releaseGuards = () => {
    clearTimeout(timeout);
    req.signal.removeEventListener("abort", onClientAbort);
  };

  // Free models flap with upstream 429s — try each until one streams OK.
  let upstream: Response | null = null;
  for (const model of CHAT_MODELS) {
    if (ac.signal.aborted) break;
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        signal: ac.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // Optional attribution shown on the OpenRouter dashboard.
          "HTTP-Referer": "https://nitinmohan.dev",
          "X-Title": "Nitin Mohan - Portfolio",
        },
        body: JSON.stringify({
          model,
          max_tokens: MAX_OUTPUT_TOKENS,
          stream: true,
          messages: apiMessages,
          // Several current slugs are reasoning models: left on, they spend the
          // whole token budget on hidden reasoning and stream back empty
          // content. Non-reasoning models ignore this field.
          reasoning: { enabled: false },
        }),
      });
      if (res.ok && res.body) {
        upstream = res;
        break;
      }
      const detail = await res.text().catch(() => "");
      console.error("OpenRouter model failed:", model, res.status, detail);
    } catch (err) {
      console.error("OpenRouter fetch error:", model, err);
    }
  }

  if (!upstream || !upstream.body) {
    releaseGuards();
    return Response.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 }
    );
  }

  // Re-stream the upstream SSE as plain text deltas to the client.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const readable = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE frames are separated by newlines; each data line is JSON.
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const data = t.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const text = json?.choices?.[0]?.delta?.content;
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // Ignore keep-alive / partial frames.
            }
          }
        }
      } catch {
        if (!ac.signal.aborted) {
          controller.enqueue(
            encoder.encode("\n\n(Sorry — the response was interrupted.)")
          );
        }
      } finally {
        releaseGuards();
        reader.cancel().catch(() => {});
        controller.close();
      }
    },
    cancel() {
      // Client went away mid-stream: stop the upstream generation.
      ac.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

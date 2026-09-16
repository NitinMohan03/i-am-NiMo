import {
  CHAT_MODELS,
  OPENROUTER_URL,
  MAX_OUTPUT_TOKENS,
  MAX_INPUT_CHARS,
  MAX_ASSISTANT_CHARS,
  UPSTREAM_TIMEOUT_MS,
  FIRST_TOKEN_TIMEOUT_MS,
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

type ApiMessage = { role: string; content: string };

type OpenStream = {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  decoder: TextDecoder;
  /** The first real text the model produced, already consumed from the stream. */
  firstText: string;
  /** Any partial SSE line left after the first text was found. */
  leftover: string;
};

/**
 * Parse one SSE line. Returns the content delta if present, and whether the
 * frame carried an upstream error (OpenRouter puts 429/502 inside a 200 body).
 */
function parseFrame(line: string): {
  text: string;
  error: string | null;
  /** true when the model stopped because it hit max_tokens, not because it finished. */
  truncated: boolean;
} {
  const none = { text: "", error: null, truncated: false };
  const t = line.trim();
  if (!t.startsWith("data:")) return none;
  const data = t.slice(5).trim();
  if (data === "[DONE]") return none;
  try {
    const json = JSON.parse(data);
    if (json?.error) {
      return { ...none, error: JSON.stringify(json.error).slice(0, 200) };
    }
    const choice = json?.choices?.[0];
    return {
      text: choice?.delta?.content ?? "",
      error: null,
      truncated: choice?.finish_reason === "length",
    };
  } catch {
    // Keep-alive comments and partial frames.
    return none;
  }
}

// Appended when a reply is cut off by the token ceiling, so the visitor sees
// a deliberate ending rather than a sentence that stops mid-word.
const TRUNCATION_TRAILER =
  "\n\n_(Trimmed for length. Ask about any part and I'll go deeper.)_";

/**
 * Open a streaming completion and read until the first content delta. Resolves
 * null if the model answered with an error status, an error frame, an empty
 * stream, or nothing within FIRST_TOKEN_TIMEOUT_MS — the caller then tries the
 * next model instead of streaming silence to the visitor.
 */
async function openStream(
  model: string,
  apiKey: string,
  messages: ApiMessage[],
  signal: AbortSignal
): Promise<OpenStream | null> {
  let res: Response;
  try {
    res = await fetch(OPENROUTER_URL, {
      method: "POST",
      signal,
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
        messages,
        // Several current slugs are reasoning models: left on, they spend the
        // whole token budget on hidden reasoning and stream back empty
        // content. Non-reasoning models ignore this field.
        reasoning: { enabled: false },
      }),
    });
  } catch (err) {
    console.error("OpenRouter fetch error:", model, err);
    return null;
  }

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    console.error("OpenRouter model failed:", model, res.status, detail.slice(0, 200));
    return null;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const deadline = Date.now() + FIRST_TOKEN_TIMEOUT_MS;
  let buffer = "";

  const giveUp = (why: string) => {
    console.error("OpenRouter model produced no text:", model, why);
    reader.cancel().catch(() => {});
    return null;
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (Date.now() > deadline) return giveUp("first token timeout");
    let chunk: ReadableStreamReadResult<Uint8Array>;
    try {
      chunk = await reader.read();
    } catch (err) {
      return giveUp(String(err));
    }
    if (chunk.done) return giveUp("stream ended before any content");

    buffer += decoder.decode(chunk.value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    let firstText = "";
    for (const line of lines) {
      const { text, error } = parseFrame(line);
      if (error) return giveUp(error);
      firstText += text;
    }
    if (firstText) return { reader, decoder, firstText, leftover: buffer };
  }
}

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

  // Try each model until one produces an actual first token. A 200 is not
  // enough: free models routinely answer 200 and then put a 429/502 error
  // frame, or nothing at all, inside the SSE body. Forwarding that gives the
  // visitor a blank bubble, so a model only wins once real text arrives.
  let upstream: OpenStream | null = null;
  for (const model of CHAT_MODELS) {
    if (ac.signal.aborted) break;
    upstream = await openStream(model, apiKey, apiMessages, ac.signal);
    if (upstream) break;
  }

  if (!upstream) {
    releaseGuards();
    return Response.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 }
    );
  }

  // Re-stream the upstream SSE as plain text deltas to the client.
  const encoder = new TextEncoder();
  const { reader, decoder, firstText } = upstream;

  const readable = new ReadableStream({
    async start(controller) {
      let buffer = upstream!.leftover;
      let trailerSent = false;
      try {
        controller.enqueue(encoder.encode(firstText));
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const { text, truncated } = parseFrame(line);
            if (text) controller.enqueue(encoder.encode(text));
            if (truncated && !trailerSent) {
              trailerSent = true;
              controller.enqueue(encoder.encode(TRUNCATION_TRAILER));
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

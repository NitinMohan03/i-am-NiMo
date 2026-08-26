import {
  CHAT_MODELS,
  OPENROUTER_URL,
  MAX_OUTPUT_TOKENS,
  MAX_INPUT_CHARS,
  buildSystemPrompt,
} from "@/lib/anthropic";

export const runtime = "nodejs";

// --- Tiny in-memory IP rate limiter (per server instance) -------------------
// Good enough to stop casual abuse of the public demo. For serious scale use a
// shared store (e.g. Upstash). Window + cap are intentionally conservative.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
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

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
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

  // Trim history + enforce input size.
  const trimmed = messages.slice(-10).map((m) => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m.content ?? "").slice(0, MAX_INPUT_CHARS),
  }));
  const totalChars = trimmed.reduce((n, m) => n + m.content.length, 0);
  if (totalChars > MAX_INPUT_CHARS * 4) {
    return Response.json({ error: "Message too long." }, { status: 413 });
  }

  // OpenAI-compatible messages: system prompt first, then the trimmed history.
  const apiMessages = [
    { role: "system", content: buildSystemPrompt() },
    ...trimmed,
  ];

  // Free models flap with upstream 429s — try each until one streams OK.
  let upstream: Response | null = null;
  for (const model of CHAT_MODELS) {
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
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
        controller.enqueue(
          encoder.encode("\n\n(Sorry — the response was interrupted.)")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

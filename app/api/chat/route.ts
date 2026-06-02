import Anthropic from "@anthropic-ai/sdk";
import {
  CHAT_MODEL,
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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chat is not configured. Set ANTHROPIC_API_KEY." },
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

  const anthropic = new Anthropic({ apiKey });

  try {
    const stream = anthropic.messages.stream({
      model: CHAT_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: buildSystemPrompt(),
      messages: trimmed,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
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
  } catch (err) {
    console.error("Anthropic error:", err);
    return Response.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 }
    );
  }
}

"use client";

import { useEffect, useRef } from "react";
import { SectionHead } from "./SectionHead";
import { Markdown } from "./Markdown";
import { useChat, CHIPS } from "./useChat";
import { profile } from "@/data/profile";

/**
 * The portfolio's own GenAI demo: a chat grounded in data/profile.ts via
 * lib/anthropic.ts#buildSystemPrompt. State and streaming come from useChat —
 * this file is presentation only.
 */
export function AskAI() {
  const { messages, input, setInput, loading, send } = useChat();
  const threadRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as tokens stream in.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  return (
    <section
      id="ask"
      data-spy="ask"
      className="relative z-[1] scroll-mt-24 border-t border-line-soft px-[clamp(20px,5vw,72px)] py-[clamp(80px,11vh,140px)]"
    >
      <SectionHead
        title="Talk to the site."
        caption={
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-coral" />
            Live model, grounded in this page&apos;s data
          </span>
        }
        maxWidth="max-w-[20ch]"
      />

      <div className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="flex flex-col gap-6">
          <p
            data-reveal="up"
            className="m-0 max-w-[44ch] text-[clamp(17px,1.4vw,21px)] leading-[1.6] text-ink [text-wrap:pretty]"
          >
            I built this one. Ask it anything about my work; it only knows what&apos;s
            on this page.
          </p>
          {/* The stack as a spec strip, same register as the project metrics.
              Says "engineer" without narrating the feature. */}
          <ul
            data-reveal="up"
            data-delay="80"
            className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-dim"
          >
            {["Next.js", "OpenRouter", "Streamed", "Rate-limited"].map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="text-coral">·</span>}
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal="scale"
          data-delay="60"
          className="flex flex-col border border-line bg-ground-panel p-4 sm:p-5"
        >
          <div
            ref={threadRef}
            aria-live="polite"
            className="thin-scroll mb-4 flex max-h-[420px] min-h-[260px] flex-1 flex-col gap-3 overflow-y-auto pr-1"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <button
                key={c.label}
                onClick={() => send(c.prompt)}
                disabled={loading}
                className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[11.5px] text-ink-muted transition-colors hover:border-coral/45 hover:text-ink disabled:opacity-50"
              >
                {c.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border border-line-strong bg-ground p-1.5"
          >
            <label htmlFor="ask-input" className="sr-only">
              Ask me anything about {profile.firstName}
            </label>
            <input
              id="ask-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask anything about ${profile.firstName}…`}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-dim focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-coral text-ground transition-colors hover:bg-coral-light disabled:opacity-40"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "whitespace-pre-wrap bg-coral text-ground"
            : "border border-line bg-ground text-ink"
        }`}
      >
        {content ? (
          isUser ? (
            content
          ) : (
            <Markdown>{content}</Markdown>
          )
        ) : (
          <TypingDots />
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-blink rounded-full bg-ink-dim"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

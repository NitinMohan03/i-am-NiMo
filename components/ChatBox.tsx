"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { useChat, CHIPS } from "./useChat";
import { Markdown } from "./Markdown";

export function ChatBox() {
  const { messages, input, setInput, loading, send } = useChat();
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll thread to bottom on new content.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  return (
    <div className="surface flex h-full w-full flex-col rounded-3xl p-3 sm:p-4">
      {/* Thread */}
      <div
        ref={threadRef}
        aria-live="polite"
        className="thin-scroll mb-3 flex flex-1 flex-col gap-3 overflow-y-auto px-1 py-2"
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
      </div>

      {/* Quick-prompt chips */}
      <div className="mb-3 flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <button
            key={c.label}
            onClick={() => send(c.prompt)}
            disabled={loading}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)] disabled:opacity-50"
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-1.5"
      >
        <label htmlFor="chat-input-mobile" className="sr-only">
          Ask me anything about {profile.firstName}
        </label>
        <input
          id="chat-input-mobile"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask me anything about ${profile.firstName}…`}
          autoComplete="off"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-ink-950 transition-opacity disabled:opacity-40"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export function MessageBubble({
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
        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "whitespace-pre-wrap bg-gradient-brand text-ink-950"
            : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)]"
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

export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce-slow rounded-full bg-[var(--text-muted)]"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

export function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Msg = { role: "user" | "assistant"; content: string };

const CHIPS = [
  { label: "My experience", prompt: "What's Nitin's work experience?" },
  { label: "Projects", prompt: "What projects has Nitin built?" },
  { label: "Skills", prompt: "What are Nitin's strongest technical skills?" },
  { label: "Contact", prompt: "How can I get in touch with Nitin?" },
];

// Preloaded so the thread is never empty.
const SEED: Msg[] = [
  { role: "user", content: `Who is ${profile.firstName}?` },
  {
    role: "assistant",
    content: `${profile.firstName} is a software engineer with 3 years at Accenture and an M.S. in CS at NYU. He builds **GenAI/RAG** services and fast React frontends. Ask me about his experience, projects, or skills! 👋`,
  },
];

export function ChatBox() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll thread to bottom on new content.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Placeholder assistant bubble we stream into.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "The assistant is unavailable right now."
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `⚠️ ${message}`,
        };
        return copy;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="surface mx-auto w-full max-w-2xl rounded-3xl p-3 shadow-2xl shadow-black/30 sm:p-4">
      {/* Thread */}
      <div
        ref={threadRef}
        aria-live="polite"
        className="thin-scroll mb-3 flex max-h-[300px] min-h-[180px] flex-col gap-3 overflow-y-auto px-1 py-2"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gradient-brand text-white"
                  : "bg-[var(--bg-elevated)] text-[var(--text)] border border-[var(--border)]"
              }`}
            >
              {m.content || (
                <TypingDots />
              )}
            </div>
          </div>
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
        <label htmlFor="chat-input" className="sr-only">
          Ask me anything about {profile.firstName}
        </label>
        <input
          id="chat-input"
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
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white transition-opacity disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>

      {/* Quick-prompt chips */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
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
    </div>
  );
}

function TypingDots() {
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

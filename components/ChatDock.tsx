"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useChat, CHIPS } from "./useChat";
import { MessageBubble, SendIcon } from "./ChatBox";

/**
 * Desktop sidebar chat: a slim input + chips at the bottom of the sidebar.
 * Asking opens a wide floating panel over the page content where the answer
 * streams in (readable, while the sidebar stays slim).
 */
export function ChatDock() {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, loading, send } = useChat(() =>
    setOpen(true)
  );
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      {/* Floating answer panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-6 left-[21rem] z-50 flex max-h-[72vh] w-[26rem] flex-col rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-ink-950">
                  <SparkIcon />
                </span>
                <p className="text-sm font-semibold">
                  Ask {profile.firstName}&apos;s AI
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-7 w-7 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              ref={threadRef}
              aria-live="polite"
              className="thin-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-1 py-1"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slim dock — input + chips */}
      <div className="border-t border-[var(--border)] pt-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-brand text-ink-950">
            <SparkIcon />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
            Ask my AI
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-1.5"
        >
          <label htmlFor="chat-input-dock" className="sr-only">
            Ask me anything about {profile.firstName}
          </label>
          <input
            id="chat-input-dock"
            value={input}
            onFocus={() => setOpen(true)}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about me…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-brand text-ink-950 transition-opacity disabled:opacity-40"
          >
            <SendIcon />
          </button>
        </form>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {CHIPS.slice(0, 4).map((c) => (
            <button
              key={c.label}
              onClick={() => send(c.prompt)}
              disabled={loading}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-0.5 text-[11px] text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)] disabled:opacity-50"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
    </svg>
  );
}

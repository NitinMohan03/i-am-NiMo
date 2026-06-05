"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

export type Msg = { role: "user" | "assistant"; content: string };

// Preloaded so the thread is never empty.
export const SEED: Msg[] = [
  { role: "user", content: `Who is ${profile.firstName}?` },
  {
    role: "assistant",
    content: `${profile.firstName} is a software engineer with 3 years at Accenture and an M.S. in CS at NYU. He builds **AI / agentic** products and fast React frontends. Ask me about his experience, projects, or skills! 👋`,
  },
];

export const CHIPS = [
  { label: "Experience", prompt: "What's Nitin's work experience?" },
  { label: "Projects", prompt: "What projects has Nitin built?" },
  { label: "AI work", prompt: "What AI and agentic work has Nitin done?" },
  { label: "Skills", prompt: "What are Nitin's strongest technical skills?" },
  { label: "Contact", prompt: "How can I get in touch with Nitin?" },
];

/**
 * Shared chat state + streaming logic for the "Ask my AI" boxes.
 * `onSend` fires whenever a message is dispatched (used to open the panel).
 */
export function useChat(onSend?: () => void) {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    onSend?.();

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
        throw new Error(data.error || "The assistant is unavailable right now.");
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
        copy[copy.length - 1] = { role: "assistant", content: `⚠️ ${message}` };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return { messages, input, setInput, loading, send };
}

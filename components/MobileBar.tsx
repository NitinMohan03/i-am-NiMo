"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./Avatar";
import { ThemeToggle } from "./ThemeToggle";
import { ChatBox } from "./ChatBox";
import { NAV_LINKS } from "./Sidebar";
import { profile } from "@/data/profile";

export function MobileBar() {
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);

  return (
    <>
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)]/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <a href="#home" className="flex items-center gap-2">
          <Avatar className="h-9 w-9 rounded-xl text-sm" />
          <span className="font-display text-base font-bold">{profile.name}</span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Nav drawer */}
      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenu(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              aria-label="Mobile"
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-[var(--border)] bg-[var(--bg-elevated)] p-5 lg:hidden"
            >
              <button
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="mb-6 ml-auto grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMenu(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text)]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={l.icon} />
                      </svg>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${profile.socials.email}`}
                className="mt-auto rounded-full bg-gradient-brand px-4 py-3 text-center font-medium text-white"
              >
                Get in touch
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Chat FAB */}
      <button
        onClick={() => setChat(true)}
        aria-label="Ask my AI"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-3 font-medium text-white shadow-xl shadow-purple-500/30 lg:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
        </svg>
        Ask AI
      </button>

      {/* Chat sheet */}
      <AnimatePresence>
        {chat && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChat(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 flex h-[80vh] flex-col rounded-t-3xl border-t border-[var(--border)] bg-[var(--bg)] p-3 lg:hidden"
            >
              <div className="mx-auto mb-2 h-1.5 w-10 shrink-0 rounded-full bg-[var(--border-strong)]" />
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-sm font-semibold">Ask {profile.firstName}&apos;s AI</p>
                <button
                  onClick={() => setChat(false)}
                  aria-label="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="min-h-0 flex-1">
                <ChatBox />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

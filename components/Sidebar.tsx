"use client";

import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { ThemeToggle } from "./ThemeToggle";
import { ChatDock } from "./ChatDock";
import { profile } from "@/data/profile";

export const NAV_LINKS = [
  { href: "#home", label: "Home", icon: "M3 11l9-8 9 8M5 10v10h14V10" },
  { href: "#about", label: "About", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" },
  { href: "#projects", label: "Projects", icon: "M3 7h7l2 2h9v11H3zM3 7V5h5l2 2" },
  { href: "#github", label: "Activity", icon: "M3 12h4l3 8 4-16 3 8h4" },
  { href: "#skills", label: "Skills", icon: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" },
  { href: "#contact", label: "Contact", icon: "M4 4h16v16H4zM4 6l8 6 8-6" },
];

const SOCIALS = [
  { label: "GitHub", href: profile.socials.github, icon: "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.7 3.4 5.6 3.7 5.6 3.7a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 10.1c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: "M4 4h16v16H4zM8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3" },
  { label: "Email", href: `mailto:${profile.socials.email}`, icon: "M4 4h16v16H4zM4 6l8 6 8-6" },
];

/** Track which section is in view to highlight the matching nav link. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function Sidebar() {
  const active = useScrollSpy(NAV_LINKS.map((l) => l.href));

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 flex-col border-r border-[var(--border)] bg-[var(--bg-elevated)]/70 backdrop-blur-xl lg:flex">
      {/* Identity */}
      <div className="flex items-center gap-3 px-6 pb-5 pt-7">
        <Avatar className="h-14 w-14 rounded-2xl text-xl shadow-md shadow-black/10" />
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold leading-tight">
            {profile.name}
          </p>
          <p className="truncate text-xs text-[var(--text-muted)]">
            {profile.title}
          </p>
        </div>
      </div>

      {/* Status pill */}
      <div className="px-6">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium leading-tight text-[var(--text-muted)]">
            Open to FDE · AI/Agentic · Full-Stack roles
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav aria-label="Primary" className="thin-scroll flex-1 overflow-y-auto px-4 py-5">
        <ul className="space-y-1">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--bg-card)] font-medium text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text)]"
                  }`}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isActive ? "text-[var(--accent-text)]" : ""}
                  >
                    <path d={l.icon} />
                  </svg>
                  {l.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-cobalt" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Socials + theme */}
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex gap-1.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>

      {/* Chat dock */}
      <div className="px-6 pb-6">
        <ChatDock />
      </div>
    </aside>
  );
}

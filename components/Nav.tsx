"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/data/profile";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border px-2 py-2 transition-all duration-300 ${
          scrolled
            ? "border-[var(--border-strong)] bg-[var(--bg-elevated)]/80 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-[var(--border)] bg-[var(--bg-card)] backdrop-blur-md"
        }`}
      >
        <ThemeToggle />

        <ul className="hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.socials.email}`}
          className="rounded-full bg-gradient-brand px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.03]"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}

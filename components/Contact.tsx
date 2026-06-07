"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const links = [
  {
    label: "Email",
    value: profile.socials.email,
    href: `mailto:${profile.socials.email}`,
    icon: (
      <path d="M4 4h16v16H4zM4 6l8 6 8-6" />
    ),
  },
  {
    label: "LinkedIn",
    value: "in/nitin-mohan1903",
    href: profile.socials.linkedin,
    icon: (
      <path d="M4 4h16v16H4zM8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3" />
    ),
  },
  {
    label: "GitHub",
    value: `@${profile.githubUsername}`,
    href: profile.socials.github,
    icon: (
      <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.7 3.4 5.6 3.7 5.6 3.7a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 10.1c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="surface rounded-3xl p-10 text-center"
      >
        <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Let&apos;s build something <span className="text-[var(--accent-text)]">together</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[var(--text-muted)]">
          {profile.status}. The fastest way to reach me is email, or grab a link below.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-text)]">
                {l.icon}
              </svg>
              <span className="text-sm font-medium">{l.label}</span>
              <span className="break-all text-xs text-[var(--text-muted)]">
                {l.value}
              </span>
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.socials.email}`}
          className="mt-8 inline-block rounded-full bg-gradient-brand px-6 py-3 font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          Say hello →
        </a>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-[var(--text-muted)] sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js,
          TypeScript &amp; Tailwind CSS.
        </p>
        <div className="flex gap-4">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">
            LinkedIn
          </a>
          <a href={`mailto:${profile.socials.email}`} className="hover:text-[var(--text)]">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

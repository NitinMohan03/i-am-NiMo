"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 px-4 pt-24 lg:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        <p className="text-sm font-medium text-accent-purple">
          {profile.title} · {profile.education[0].school} M.S. CS
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m {profile.firstName}{" "}
          <span className="text-gradient">{profile.lastName}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
          {profile.intro}
        </p>

        {/* Target roles */}
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-accent-purple/40 bg-accent-purple/10 px-3 py-1 text-xs font-medium text-accent-purple"
            >
              {r}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.highlights.map((h) => (
            <div
              key={h.label}
              className="surface rounded-2xl px-4 py-3"
            >
              <div className="font-display text-2xl font-bold sm:text-3xl">
                {h.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

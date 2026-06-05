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
        <p className="text-sm font-medium text-accent-clay">
          {profile.title} · {profile.education[0].school} M.S. CS
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m {profile.firstName}{" "}
          <span className="text-accent-clay">{profile.lastName}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
          {profile.intro}
        </p>

        {/* Target roles */}
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-accent-clay/40 bg-accent-clay/10 px-3 py-1 text-xs font-medium text-accent-clay"
            >
              {r}
            </span>
          ))}
        </div>

        {/* Telemetry readout: real, specific numbers as an instrument strip, not metric cards */}
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-5 border-t border-[var(--border)] pt-6">
          {profile.highlights.map((h, i) => (
            <div
              key={h.label}
              className={i > 0 ? "sm:border-l sm:border-[var(--border)] sm:pl-8" : ""}
            >
              <dt className="font-display text-2xl font-bold leading-none sm:text-3xl">
                {h.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                {h.label}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}

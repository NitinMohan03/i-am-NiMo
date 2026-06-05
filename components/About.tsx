"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { profile } from "@/data/profile";

const card =
  "surface rounded-3xl p-6 transition-colors hover:border-[var(--border-strong)]";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="About"
        title="A bit about"
        accent="me"
        subtitle="Full-stack engineer who fell for AI — here's how I think and what I'm building."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Narrative — wide */}
        <div className={`${card} sm:col-span-2`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            My mindset
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text)]/90">
            {profile.mindset}
          </p>
        </div>

        {/* Currently / focus */}
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Currently
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {profile.focus}
          </p>
        </div>

        {/* What I build — wide */}
        <div className={`${card} sm:col-span-2`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            What I build
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.builds.map((b) => (
              <span
                key={b}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className={card}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Based in
          </p>
          <h4 className="mt-2 font-display text-xl font-bold">
            {profile.location.city}
          </h4>
          <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
            {profile.location.coordinates}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

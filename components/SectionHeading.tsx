"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        {title} <span className="text-gradient">{accent}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  title,
  accent,
  subtitle,
}: {
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
      <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
        {title} <span className="text-accent-clay">{accent}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

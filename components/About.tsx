"use client";

import { motion } from "framer-motion";
import { Avatar } from "./Avatar";
import { profile } from "@/data/profile";

const card =
  "surface rounded-3xl p-6 transition-colors hover:border-[var(--border-strong)]";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Name / title — wide */}
        <div className={`${card} sm:col-span-2`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            About me
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {profile.name}
          </h3>
          <p className="mt-1 text-[var(--text-muted)]">
            {profile.title} · {profile.education[0].school} M.S. CS
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
            {profile.mindset}
          </p>
        </div>

        {/* Photo */}
        <div className={`${card} flex items-center justify-center`}>
          <Avatar className="h-32 w-32 rounded-3xl text-[2.5rem]" />
        </div>

        {/* What I build */}
        <div className={card}>
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

        {/* Status — wide */}
        <div
          className={`${card} flex items-center gap-3 sm:col-span-2 lg:col-span-1`}
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-medium">{profile.status}</p>
        </div>
      </motion.div>
    </section>
  );
}

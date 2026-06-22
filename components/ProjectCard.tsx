"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/profile";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.24) }}
      className="panel group grid gap-6 rounded-3xl p-6 transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-2xl hover:shadow-accent-cobalt/10 sm:p-8 md:grid-cols-[150px_1fr]"
    >
      {/* Spine: number + category — the visual anchor (replaces the colour band) */}
      <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-2 md:border-r md:border-[var(--border)] md:pr-6">
        <span className="font-display text-5xl font-extrabold leading-none text-[var(--accent-text)]/40 tabular-nums transition-colors duration-300 group-hover:text-[var(--accent-text)]/70 md:text-6xl">
          {project.number}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0">
        {/* Header row: name + links */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold">{project.name}</h3>
          {(project.repo || project.demo) && (
            <div className="flex gap-4 text-sm">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent-text)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                  </svg>
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent-text)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                  </svg>
                  Live
                </a>
              )}
            </div>
          )}
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          {project.description}
        </p>

        {/* Metrics readout strip — mirrors the Hero telemetry pattern */}
        {project.metrics && project.metrics.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-4 border-t border-[var(--border)] pt-5">
            {project.metrics.map((m, i) => (
              <div
                key={m.label}
                className={i > 0 ? "border-l border-[var(--border)] pl-7" : ""}
              >
                <dt className="font-display text-xl font-bold leading-none text-[var(--text)] tabular-nums">
                  {m.value}
                </dt>
                <dd className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Spec sheet */}
        {project.specs && project.specs.length > 0 && (
          <dl className="mt-6 grid gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
            {project.specs.map((s) => (
              <div key={s.label} className="flex gap-3">
                <dt className="w-16 shrink-0 font-mono uppercase tracking-wider text-[var(--accent-text)]">
                  {s.label}
                </dt>
                <dd className="text-[var(--text-muted)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Tech chips */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

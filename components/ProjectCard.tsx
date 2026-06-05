"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/profile";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="surface group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-2xl hover:shadow-accent-clay/10"
    >
      {/* Gradient preview area */}
      <div
        className={`relative h-28 bg-gradient-to-br ${project.gradient} overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:18px_18px]" />
        <span className="absolute left-5 top-4 font-display text-5xl font-extrabold text-white/30">
          {project.number}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {project.description}
        </p>

        {/* Metrics tiles */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-2"
              >
                <div className="font-display text-base font-bold leading-none text-[var(--text)]">
                  {m.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spec sheet */}
        {project.specs && project.specs.length > 0 && (
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs">
            {project.specs.map((s) => (
              <div key={s.label} className="contents">
                <dt className="font-mono uppercase tracking-wider text-accent-clay">
                  {s.label}
                </dt>
                <dd className="text-[var(--text-muted)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-4 flex flex-1 flex-wrap content-end gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.repo || project.demo) && (
          <div className="mt-5 flex gap-3 text-sm">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--text)] transition-colors hover:text-accent-clay"
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
                className="inline-flex items-center gap-1.5 font-medium text-[var(--text)] transition-colors hover:text-accent-sage"
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
    </motion.article>
  );
}

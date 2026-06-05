"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { profile } from "@/data/profile";

// Lightweight orbit: badges placed on two rings via CSS, rings rotate slowly.
// Counter-rotation keeps labels upright. Pauses for reduced-motion (CSS).
const ORBIT = [
  ["React", "Next.js", "TypeScript", "Node.js"],
  ["Python", "FastAPI", "AWS", "Docker", "Pinecone"],
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
      <SectionHeading title="My" accent="Skills" />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Orbit */}
        <div className="relative mx-auto grid h-[320px] w-[320px] place-items-center motion-reduce:[&_*]:!animate-none">
          <div className="absolute h-full w-full rounded-full border border-[var(--border)]" />
          <div className="absolute h-2/3 w-2/3 rounded-full border border-[var(--border)]" />

          <div className="absolute grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand font-display text-xl font-bold text-[#1b262b] shadow-lg shadow-accent-clay/30">
            {profile.initials}
          </div>

          {ORBIT.map((ring, ri) => {
            const radius = ri === 0 ? 105 : 158;
            const dur = ri === 0 ? "24s" : "36s";
            return (
              <div
                key={ri}
                className="absolute h-full w-full"
                style={{ animation: `spin ${dur} linear infinite` }}
              >
                {ring.map((tech, i) => {
                  const angle = (360 / ring.length) * i;
                  return (
                    <div
                      key={tech}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateX(${radius}px)`,
                      }}
                    >
                      <span
                        className="surface inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          transform: `rotate(-${angle}deg)`,
                          animation: `spin-rev ${dur} linear infinite`,
                        }}
                      >
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Grouped lists */}
        <div className="grid gap-5">
          {profile.skills.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
            >
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="surface rounded-lg px-3 py-1 text-sm transition-colors hover:border-[var(--border-strong)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-rev {
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}

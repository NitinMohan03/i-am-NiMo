"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = value.match(/^([\d.]+)(.*)/);
    if (!match || !ref.current) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? (match[1].split(".")[1]?.length ?? 0) : 0;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent =
            (decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 px-4 pt-24 pb-20 lg:pt-16 lg:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-text)]">
          {profile.title} · {profile.education[0].school} M.S. CS
        </p>
        <h1 className="mt-4">
          <span className="block font-sans text-xl font-light leading-tight text-[var(--text-muted)] sm:text-2xl">
            Hi, I&apos;m
          </span>
          <span
            className="block font-display font-extrabold leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 9vw, 5rem)" }}
          >
            {profile.firstName}{" "}
            <span className="text-[var(--accent-text)]">{profile.lastName}</span>
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text)]">
          {profile.intro}
        </p>

        {/* Target roles */}
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs font-medium text-[var(--accent-text)]"
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
              <dt className="font-display text-3xl font-bold leading-none text-[var(--text)] tabular-nums sm:text-4xl">
                <Counter value={h.value} />
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

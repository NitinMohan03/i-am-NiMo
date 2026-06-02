"use client";

import { motion } from "framer-motion";
import { ChatBox } from "./ChatBox";
import { Avatar } from "./Avatar";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <Avatar className="mb-6 h-24 w-24 animate-float rounded-3xl text-[2rem] shadow-xl shadow-purple-500/20" />

        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m {profile.firstName}{" "}
          <span className="text-gradient">{profile.lastName}</span>
        </h1>

        <p className="mt-4 max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
          {profile.tagline}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="mt-10 w-full"
      >
        <p className="mb-3 text-center text-sm text-[var(--text-muted)]">
          Ask my AI anything about me ↓
        </p>
        <ChatBox />
      </motion.div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to explore"
        className="mt-12 flex flex-col items-center gap-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
      >
        <span>Scroll to explore</span>
        <svg className="animate-bounce-slow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}

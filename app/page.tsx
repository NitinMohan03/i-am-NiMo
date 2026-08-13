import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { AskAI } from "@/components/AskAI";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    // No background here: <body> already paints the ground, and an opaque
    // background on this wrapper would cover MotionLayer's cursor glow,
    // which sits at z-0 behind the z-[1] sections.
    <div className="relative overflow-x-clip">
      <TopNav />
      <main id="main">
        <Hero />
        {/* The chat is the differentiator, so it sits above the static
            sections that answer the same questions more slowly. */}
        <AskAI />
        <About />
        <Projects />
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

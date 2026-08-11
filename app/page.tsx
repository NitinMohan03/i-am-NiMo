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
    <div className="relative overflow-x-clip bg-ground">
      <TopNav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <AskAI />
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

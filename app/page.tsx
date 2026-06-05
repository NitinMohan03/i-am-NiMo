import { Sidebar } from "@/components/Sidebar";
import { MobileBar } from "@/components/MobileBar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Skills } from "@/components/Skills";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Sidebar />
      <MobileBar />
      <div className="lg:pl-80">
        <main id="main">
          <Hero />
          <About />
          <Projects />
          <GitHubActivity />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

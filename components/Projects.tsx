import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { profile } from "@/data/profile";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured"
        accent="Projects"
        subtitle="A curated set of projects spanning GenAI, full-stack, and data engineering."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {profile.projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

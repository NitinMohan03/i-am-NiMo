import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { profile } from "@/data/profile";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16">
      <SectionHeading
        title="Featured"
        accent="Projects"
        subtitle="A curated set of projects spanning GenAI, full-stack, and data engineering."
      />
      <div className="flex flex-col gap-5">
        {profile.projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

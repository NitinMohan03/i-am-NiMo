import { SectionHead } from "./SectionHead";
import { ProjectCard } from "./ProjectCard";
import { profile } from "@/data/profile";

export function Projects() {
  // First three get full alternating rows; the rest ride in the compact grid.
  const featured = profile.projects.slice(0, 3);
  const rest = profile.projects.slice(3);

  return (
    <section
      id="work"
      data-spy="work"
      className="relative z-[1] scroll-mt-24 border-t border-line-soft px-[clamp(20px,5vw,72px)] py-[clamp(80px,11vh,140px)]"
    >
      <SectionHead
        title="Projects"
        caption={`${profile.projects.length} builds · GenAI, full-stack, data`}
        centered
        size="lg"
      />

      <div className="flex flex-col gap-[clamp(72px,10vh,130px)]">
        {featured.map((p, i) => (
          <ProjectCard key={p.name} project={p} reverse={i % 2 === 1} />
        ))}

        {rest.length > 0 && (
          <div
            data-reveal="up"
            className="grid gap-px border border-line bg-line [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]"
          >
            {rest.map((p) => (
              <a
                key={p.name}
                href={p.repo ?? profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3.5 bg-ground px-7 py-[30px] transition-colors duration-[400ms] hover:bg-ground-panel"
              >
                <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-coral">
                  {p.number} · {p.category}
                </span>
                <span className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
                  {p.name}
                </span>
                <span className="text-[15.5px] leading-[1.7] text-ink-muted [text-wrap:pretty]">
                  {p.description}
                </span>
                <span className="mt-auto pt-2 font-mono text-[11.5px] text-ink-dim">
                  {p.tech.join(" · ")}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

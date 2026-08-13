import Image from "next/image";
import type { Project } from "@/data/profile";

/**
 * A full project row: screenshot on one side, spec column on the other.
 * `reverse` flips the order so consecutive rows alternate down the page.
 */
export function ProjectCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const thumb = (
    <div
      data-tilt="1"
      className="hatch relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-line-strong transition-[transform,border-color] duration-500 ease-out hover:border-coral/45"
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 900px) 100vw, 45vw"
          className="object-cover"
        />
      ) : (
        <span className="px-6 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim">
          {project.name} screenshot
        </span>
      )}
      <span
        className={`absolute top-[-1px] bg-coral px-3 py-1.5 font-mono text-xs font-medium text-ground ${
          reverse ? "right-[-1px]" : "left-[-1px]"
        }`}
      >
        {project.number}
      </span>
    </div>
  );

  const detail = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-coral">
          {project.category}
        </span>
        <h3 className="m-0 font-display text-[clamp(24px,2.6vw,36px)] font-bold tracking-[-0.025em] text-ink [text-wrap:balance]">
          {project.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line-strong px-[13px] py-1.5 font-mono text-[11.5px] text-ink-soft"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="m-0 text-base leading-[1.75] text-ink-muted [text-wrap:pretty]">
        {project.description}
      </p>

      {project.metrics && project.metrics.length > 0 && (
        <div className="grid gap-px border border-line bg-line [grid-template-columns:repeat(auto-fit,minmax(min(50%-1px,86px),1fr))]">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 bg-ground px-3 py-3.5">
              <span className="font-display text-lg font-bold text-ink">{m.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-dim">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 self-start rounded-sm border border-coral/35 bg-coral/[0.12] px-[22px] py-3 text-[14.5px] text-coral transition-colors duration-300 hover:bg-coral hover:text-ground"
        >
          View on GitHub
          <span className="font-mono text-xs" aria-hidden>
            &#8599;
          </span>
        </a>
      )}
    </div>
  );

  return (
    <article
      data-reveal={reverse ? "right" : "left"}
      className="grid items-center gap-[clamp(28px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr))]"
    >
      {reverse ? (
        <>
          {detail}
          {thumb}
        </>
      ) : (
        <>
          {thumb}
          {detail}
        </>
      )}
    </article>
  );
}

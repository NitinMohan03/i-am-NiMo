import { SectionHead } from "./SectionHead";
import { profile } from "@/data/profile";

export function Experience() {
  return (
    <section
      id="path"
      data-spy="path"
      className="relative z-[1] scroll-mt-24 border-t border-line-soft px-[clamp(20px,5vw,72px)] py-[clamp(80px,11vh,140px)]"
    >
      <SectionHead
        title="Where I've shipped."
        caption={`${profile.experience[profile.experience.length - 1].start} → ${profile.education[0].end}`}
      />

      <div className="flex flex-col border-t border-line">
        {profile.experience.map((job) => (
          <div
            key={job.company}
            data-reveal="up"
            className="flex flex-wrap gap-[clamp(20px,4vw,56px)] border-b border-line py-10"
          >
            <div className="flex max-w-[240px] flex-[1_1_160px] flex-col gap-1.5">
              <span className="font-mono text-xs text-coral">
                {job.start} — {job.end}
              </span>
              <span className="font-mono text-[11.5px] text-ink-dim">{job.location}</span>
            </div>
            <div className="flex flex-[3_1_320px] flex-col gap-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="m-0 font-display text-[clamp(22px,2.2vw,30px)] font-bold tracking-[-0.02em] text-ink">
                  {job.company}
                </h3>
                <span className="text-[15px] text-ink-muted">{job.role}</span>
              </div>
              <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="grid grid-cols-[14px_1fr] gap-3 text-[15.5px] leading-[1.7] text-ink-muted"
                  >
                    <span className="font-mono text-coral" aria-hidden>
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div
          data-reveal="up"
          className="flex flex-wrap gap-[clamp(20px,4vw,56px)] py-10"
        >
          <div className="flex max-w-[240px] flex-[1_1_160px] flex-col gap-1.5">
            <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-dim">
              Education
            </span>
          </div>
          <div className="grid flex-[3_1_320px] gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
            {profile.education.map((ed) => (
              <div key={ed.school} className="flex flex-col gap-2">
                <span className="font-mono text-xs text-coral">
                  {ed.start} — {ed.end}
                </span>
                <span className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
                  {ed.school}
                </span>
                <span className="text-[15px] text-ink-soft">{ed.degree}</span>
                <span className="text-[14.5px] leading-[1.6] text-ink-muted">
                  {ed.detail || ed.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

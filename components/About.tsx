import { SectionHead } from "./SectionHead";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      data-spy="about"
      className="relative z-[1] scroll-mt-24 border-t border-line-soft px-[clamp(20px,5vw,72px)] py-[clamp(80px,11vh,140px)]"
    >
      <SectionHead
        index="01"
        label="About"
        title="Full-stack engineer turned AI builder."
        maxWidth="max-w-[22ch]"
      />

      <div className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div className="flex flex-col gap-7">
          <p
            data-reveal="up"
            className="m-0 text-[clamp(17px,1.4vw,21px)] leading-[1.6] text-ink [text-wrap:pretty]"
          >
            {profile.intro}
          </p>
          <p
            data-reveal="up"
            data-delay="80"
            className="m-0 max-w-[68ch] text-[16.5px] leading-[1.75] text-ink-muted [text-wrap:pretty]"
          >
            {profile.mindset}
          </p>
          <div
            data-reveal="up"
            data-delay="140"
            className="flex flex-col gap-3 border-l-2 border-coral bg-ground-panel px-6 py-[22px]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">
              Currently
            </span>
            <p className="m-0 text-[15.5px] leading-[1.7] text-ink-soft [text-wrap:pretty]">
              {profile.focus}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border border-line bg-line">
          {profile.highlights.map((h, i) => (
            <div
              key={h.label}
              data-reveal="up"
              data-delay={String(60 + i * 60)}
              className="flex flex-col gap-2 bg-ground px-6 py-7"
            >
              <span className="font-display text-[clamp(26px,2.6vw,38px)] font-bold tracking-[-0.03em] text-coral">
                {h.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[clamp(56px,8vh,96px)] flex flex-col gap-7">
        <span
          data-reveal="up"
          className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-ink-dim"
        >
          Toolkit
        </span>
        <div className="grid auto-rows-fr gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
          {profile.skills.map((group, i) => (
            <div
              key={group.label}
              data-reveal="up"
              data-delay={String(40 + i * 60)}
              className="flex flex-col gap-3.5 border border-line bg-ground px-6 py-[26px] transition-colors duration-[400ms] hover:bg-ground-panel"
            >
              <span className="font-display text-base font-bold tracking-[-0.01em] text-ink">
                {group.label}
              </span>
              <span className="text-[14.5px] leading-[1.85] text-ink-muted">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

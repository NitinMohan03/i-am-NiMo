import { profile } from "@/data/profile";

const YEAR = new Date().getFullYear();

export function Contact() {
  return (
    <section
      id="contact"
      data-spy="contact"
      className="relative z-[1] scroll-mt-24 border-t border-line-soft px-[clamp(20px,5vw,72px)] pb-[72px] pt-[clamp(90px,13vh,160px)]"
    >
      <div className="flex max-w-[1000px] flex-col gap-[22px]">
        <h2
          data-reveal="up"
          className="m-0 font-display text-[clamp(34px,5.6vw,78px)] font-extrabold leading-none tracking-[-0.035em] text-ink [text-wrap:balance]"
        >
          Let&apos;s build something that ships.
        </h2>

        <a
          data-reveal="left"
          data-delay="120"
          href={`mailto:${profile.socials.email}`}
          className="group mt-3 inline-flex items-center gap-3.5 self-start border-b-2 border-coral/40 pb-1.5 font-display text-[clamp(19px,2.4vw,32px)] font-semibold tracking-[-0.02em] text-ink transition-[border-color,gap] duration-300 hover:gap-[22px] hover:border-coral"
        >
          {profile.socials.email}
          <span className="text-[0.7em]" aria-hidden>
            &#8599;
          </span>
        </a>

        <div data-reveal="up" data-delay="180" className="mt-6 flex flex-wrap gap-3.5">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-coral bg-coral/[0.12] px-[22px] py-3 text-[14.5px] text-coral transition-colors duration-300 hover:bg-coral hover:text-ground"
          >
            Résumé (PDF)
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-line-strong px-[22px] py-3 text-[14.5px] text-ink transition-colors duration-300 hover:border-coral hover:bg-coral/10"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-line-strong px-[22px] py-3 text-[14.5px] text-ink transition-colors duration-300 hover:border-coral hover:bg-coral/10"
          >
            GitHub
          </a>
          <a
            href={`tel:${profile.socials.phone.replace(/[^+\d]/g, "")}`}
            className="rounded-sm border border-line-strong px-[22px] py-3 text-[14.5px] text-ink transition-colors duration-300 hover:border-coral hover:bg-coral/10"
          >
            {profile.socials.phone}
          </a>
        </div>
      </div>

      <footer className="mt-[clamp(64px,10vh,120px)] flex flex-wrap items-center justify-between gap-[18px] border-t border-line pt-[26px]">
        <span className="font-mono text-[11.5px] text-ink-dim">
          {profile.location.city} · {profile.location.coordinates}
        </span>
        <span className="font-mono text-[11.5px] text-ink-dim">
          © {YEAR} {profile.name}
        </span>
      </footer>
    </section>
  );
}

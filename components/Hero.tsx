import Image from "next/image";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="top"
      data-spy="hero"
      className="relative z-[1] grid min-h-svh items-center gap-[clamp(32px,6vw,88px)] px-[clamp(20px,5vw,72px)] pb-24 pt-[132px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]"
    >
      <div className="flex flex-col items-start gap-[26px]">
        <div
          data-reveal="up"
          data-delay="0"
          className="flex items-center gap-3 rounded-full border border-coral/30 bg-coral/[0.08] py-2 pl-3 pr-4"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-coral shadow-[0_0_0_4px_rgba(249,118,93,0.18)]" />
          <span className="font-mono text-[11.5px] uppercase tracking-[0.06em] text-coral-tint">
            {profile.status}
          </span>
        </div>

        <h1 className="m-0 font-display font-extrabold leading-[0.94] tracking-[-0.035em] text-ink [text-wrap:balance]">
          <span
            data-reveal="up"
            data-delay="80"
            className="block text-[clamp(38px,5.2vw,74px)]"
          >
            Hello<span className="text-coral">.</span>
          </span>
          <span
            data-reveal="up"
            data-delay="160"
            className="flex items-center gap-[22px] text-[clamp(38px,5.2vw,74px)] font-semibold text-ink-muted"
          >
            <span
              data-rule="1"
              className="block h-0.5 w-[clamp(44px,7vw,104px)] origin-left scale-x-0 bg-coral transition-transform delay-[260ms] duration-[900ms] ease-out"
            />
            I&apos;m {profile.firstName}
          </span>
          <span
            data-reveal="up"
            data-delay="240"
            className="mt-1.5 block text-[clamp(46px,7.4vw,104px)]"
          >
            {profile.title}
          </span>
        </h1>

        <p
          data-reveal="up"
          data-delay="320"
          className="m-0 max-w-[46ch] text-[clamp(16px,1.25vw,19px)] leading-[1.62] text-ink-muted [text-wrap:pretty]"
        >
          {profile.tagline}
        </p>

        <div
          data-reveal="up"
          data-delay="400"
          className="mt-1.5 flex flex-wrap items-center gap-3.5"
        >
          <a
            href="#contact"
            data-magnet="1"
            className="inline-flex items-center gap-2.5 rounded-sm bg-coral px-[26px] py-[15px] text-[15px] font-medium text-ground transition-[transform,box-shadow,background-color] duration-300 ease-out hover:bg-coral-light hover:shadow-[0_14px_34px_-12px_rgba(249,118,93,0.7)]"
          >
            Got a project?
            <span className="font-mono text-[13px]" aria-hidden>
              &rarr;
            </span>
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            data-magnet="1"
            className="inline-flex items-center gap-2.5 rounded-sm border border-coral px-[26px] py-[15px] text-[15px] font-medium text-coral transition-[transform,background-color,color] duration-300 ease-out hover:bg-coral/[0.12]"
          >
            Email me
          </a>
        </div>

        <div data-reveal="up" data-delay="480" className="mt-2.5 flex flex-wrap gap-2.5">
          {profile.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-line-strong px-3.5 py-[7px] font-mono text-[11.5px] tracking-[0.02em] text-ink-muted"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div
        data-reveal="scale"
        data-delay="220"
        className="relative flex aspect-square w-full max-w-[460px] items-center justify-center justify-self-center"
      >
        <div className="absolute inset-0 rounded-full border border-coral/20" />
        <div className="absolute inset-[6%] rounded-full border-[14px] border-coral/50" />
        <div data-orbit="1" className="absolute inset-[6%] animate-spin-slow rounded-full">
          <span className="absolute left-1/2 top-[-7px] -ml-[6.5px] h-[13px] w-[13px] rounded-full bg-coral" />
        </div>
        {/* Cut-out headshot, floating over the ring rather than masked inside
            it, so the shoulders break the circle. */}
        <div className="absolute inset-x-0 bottom-0 h-[92%] animate-float">
          <Image
            src={profile.photo ?? "/avatar.png"}
            alt={`${profile.name}, ${profile.title}`}
            fill
            priority
            sizes="(max-width: 768px) 70vw, 420px"
            // The source photo is cropped at the chest, so dissolve the last
            // slice instead of ending on a hard horizontal cut.
            className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_86%,transparent_99%)]"
          />
        </div>
      </div>

      <div className="absolute bottom-[34px] left-[clamp(20px,5vw,72px)] flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
          Scroll
        </span>
        <span className="block h-px w-[54px] bg-gradient-to-r from-coral to-coral/0" />
      </div>
    </section>
  );
}

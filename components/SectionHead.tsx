import type { ReactNode } from "react";

/**
 * Section opening. Deliberately NOT a fixed eyebrow+heading template:
 * `caption` is optional and only carries information a reader can use
 * (how many, how fresh, how long), and it sits under the heading by
 * default so sections don't all open with the same label-first shape.
 */
export function SectionHead({
  title,
  caption,
  deck,
  centered = false,
  maxWidth,
  size = "md",
}: {
  title: ReactNode;
  /** Mono line of real information. Omit it when the heading stands alone. */
  caption?: ReactNode;
  /** Body-size supporting line, set beside or under the heading. */
  deck?: ReactNode;
  centered?: boolean;
  /** Tailwind max-width class for the heading, e.g. "max-w-[22ch]". */
  maxWidth?: string;
  /** "md" = standard section, "lg" = the oversized display moments. */
  size?: "md" | "lg";
}) {
  const headingSize =
    size === "lg"
      ? "text-[clamp(38px,6vw,84px)] font-extrabold leading-none tracking-[-0.035em]"
      : "text-[clamp(30px,4.2vw,56px)] font-bold leading-[1.04] tracking-[-0.03em]";

  return (
    <div
      className={
        centered
          ? "mb-[clamp(56px,8vh,96px)] flex flex-col items-center gap-4 text-center"
          : "mb-14 flex flex-col gap-4"
      }
    >
      <h2
        data-reveal="up"
        className={`m-0 font-display text-ink [text-wrap:balance] ${headingSize} ${maxWidth ?? ""}`}
      >
        {title}
      </h2>

      {caption && (
        <span
          data-reveal="up"
          data-delay="60"
          className="font-mono text-[11.5px] tracking-[0.08em] text-ink-dim"
        >
          {caption}
        </span>
      )}

      {deck && (
        <p
          data-reveal="up"
          data-delay="80"
          className="m-0 max-w-[54ch] text-[clamp(17px,1.4vw,21px)] leading-[1.6] text-ink-soft [text-wrap:pretty]"
        >
          {deck}
        </p>
      )}

      {centered && (
        <div
          data-reveal="drop"
          data-delay="140"
          className="mt-3.5 flex flex-col items-center gap-2"
        >
          <span className="block h-[54px] w-px bg-gradient-to-b from-coral/0 to-coral" />
          <span className="h-2 w-2 rounded-full bg-coral" />
        </div>
      )}
    </div>
  );
}

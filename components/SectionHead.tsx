import type { ReactNode } from "react";

/**
 * The `NN — Label` mono eyebrow + display heading pair every section opens
 * with. `centered` adds the vertical coral drop-line used by Projects.
 */
export function SectionHead({
  index,
  label,
  title,
  centered = false,
  maxWidth,
  size = "md",
}: {
  index: string;
  label: string;
  title: ReactNode;
  centered?: boolean;
  /** Tailwind max-width class for the heading, e.g. "max-w-[22ch]". */
  maxWidth?: string;
  /** "md" = standard section, "lg" = the oversized Projects/Contact display. */
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
          ? "mb-[clamp(56px,8vh,96px)] flex flex-col items-center gap-[18px] text-center"
          : "mb-14 flex flex-col gap-4"
      }
    >
      <span
        data-reveal="up"
        className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-coral"
      >
        {index} — {label}
      </span>
      <h2
        data-reveal="up"
        data-delay="60"
        className={`m-0 font-display text-ink ${headingSize} ${maxWidth ?? ""}`}
      >
        {title}
      </h2>

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

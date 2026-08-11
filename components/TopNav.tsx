import { profile } from "@/data/profile";

// Anchors match the section ids in app/page.tsx; `spy` matches their data-spy.
const LINKS = [
  { label: "About", href: "#about", spy: "about" },
  { label: "Work", href: "#work", spy: "work" },
  { label: "Ask AI", href: "#ask", spy: "ask" },
  { label: "Experience", href: "#path", spy: "path" },
  { label: "Contact", href: "#contact", spy: "contact" },
];

/**
 * Fixed header + scroll-progress track. Purely declarative — MotionLayer
 * drives the condense-on-scroll, the progress width and the spy underlines
 * through the data-attributes below.
 */
export function TopNav() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/[0.06]">
        <div data-progress="1" className="h-full w-0 bg-coral" />
      </div>

      <header
        data-nav="1"
        className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 border-b border-transparent transition-[padding,background-color,border-color,backdrop-filter] duration-[400ms] ease-out"
        style={{ padding: "clamp(16px, 2.5vw, 26px) clamp(20px, 5vw, 72px)" }}
      >
        <a
          href="#top"
          className="flex items-baseline gap-2.5 font-display text-[19px] font-bold tracking-[-0.02em] text-ink"
        >
          {profile.name}
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-coral" />
        </a>

        {/* Below sm the links scroll sideways in one row instead of wrapping
            the header to three lines. */}
        <nav className="thin-scroll -mx-1 flex max-w-full flex-nowrap items-center gap-x-5 overflow-x-auto px-1 sm:mx-0 sm:flex-wrap sm:gap-x-[clamp(14px,3vw,40px)] sm:overflow-visible sm:px-0">
          {LINKS.map((l) => (
            <a
              key={l.spy}
              data-spy-link={l.spy}
              href={l.href}
              className="relative shrink-0 py-1 text-sm tracking-[0.01em] text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span
                data-spy-bar={l.spy}
                className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-coral transition-transform duration-[400ms] ease-out"
              />
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}

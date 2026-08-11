"use client";

import { useEffect } from "react";

/**
 * Every scroll-driven behaviour on the page, in one client component:
 * reveals, cursor glow, magnetic buttons, card tilt, nav condense, progress
 * bar and scroll-spy. Sections stay server components and opt in with plain
 * data-attributes (`data-reveal`, `data-magnet`, `data-tilt`, `data-spy`).
 *
 * Ported from the reference design's mount script so the timing curves match.
 */

const HIDDEN: Record<string, string> = {
  up: "translateY(26px)",
  left: "translateX(-40px)",
  right: "translateX(40px)",
  scale: "scale(0.94)",
  drop: "translateY(-18px)",
};

export function MotionLayer() {
  useEffect(() => {
    const cleanup: Array<() => void> = [];
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const glow = document.querySelector<HTMLElement>("[data-glow]");
    const rule = document.querySelector<HTMLElement>("[data-rule]");

    // --- scroll reveals ----------------------------------------------------
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (animate) {
      nodes.forEach((n) => {
        const dir = n.getAttribute("data-reveal") || "up";
        const delay = parseInt(n.getAttribute("data-delay") || "0", 10);
        n.style.opacity = "0";
        n.style.transform = HIDDEN[dir] || HIDDEN.up;
        n.style.willChange = "opacity, transform";
        n.style.transition = `opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
      });
      // Inline styles are in place — release the pre-paint guard.
      document.documentElement.classList.remove("pre-reveal");

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "none";
            io.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      nodes.forEach((n) => io.observe(n));

      // Safety net: if the observer never fires (tab loaded hidden), show
      // whatever is already on screen.
      const safety = window.setTimeout(() => {
        nodes.forEach((n) => {
          const r = n.getBoundingClientRect();
          if (n.style.opacity === "0" && r.top < window.innerHeight && r.bottom > 0) {
            n.style.opacity = "1";
            n.style.transform = "none";
          }
        });
      }, 2500);

      cleanup.push(() => {
        io.disconnect();
        window.clearTimeout(safety);
      });
    } else {
      document.documentElement.classList.remove("pre-reveal");
    }

    // Hero accent rule draws itself in; glow fades up.
    requestAnimationFrame(() => {
      if (rule) rule.style.transform = "scaleX(1)";
      if (glow && animate) glow.style.opacity = "1";
    });

    // --- cursor glow (lerped) ----------------------------------------------
    if (glow && animate && finePointer) {
      let tx = window.innerWidth * 0.7;
      let ty = window.innerHeight * 0.4;
      let cx = tx;
      let cy = ty;
      let raf = 0;
      const onMove = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
      };
      const tick = () => {
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        glow.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        raf = requestAnimationFrame(tick);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
      cleanup.push(() => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
      });
    }

    // --- magnetic buttons + card tilt ---------------------------------------
    if (animate && finePointer) {
      document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          el.style.transform = `translate(${dx * 7}px,${dy * 7}px)`;
        };
        const leave = () => {
          el.style.transform = "translate(0,0)";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanup.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          el.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-4px)`;
        };
        const leave = () => {
          el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanup.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // --- nav condense, progress bar, scroll spy -----------------------------
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const bar = document.querySelector<HTMLElement>("[data-progress]");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-spy]"));
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
        if (nav) {
          const on = y > 40;
          nav.style.padding = on
            ? "clamp(10px, 1.6vw, 14px) clamp(20px, 5vw, 72px)"
            : "clamp(16px, 2.5vw, 26px) clamp(20px, 5vw, 72px)";
          nav.style.backgroundColor = on ? "rgba(21,26,34,0.82)" : "transparent";
          nav.style.backdropFilter = on ? "blur(14px)" : "none";
          nav.style.borderBottomColor = on ? "rgba(255,255,255,0.08)" : "transparent";
        }

        let active = "";
        sections.forEach((s) => {
          const r = s.getBoundingClientRect();
          if (r.top <= window.innerHeight * 0.42 && r.bottom > window.innerHeight * 0.3) {
            active = s.getAttribute("data-spy") || "";
          }
        });
        document.querySelectorAll<HTMLElement>("[data-spy-link]").forEach((a) => {
          const on = a.getAttribute("data-spy-link") === active;
          a.style.color = on ? "#e9edf3" : "#99a3b2";
          const b = a.querySelector<HTMLElement>("[data-spy-bar]");
          if (b) b.style.transform = on ? "scaleX(1)" : "scaleX(0)";
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanup.push(() => window.removeEventListener("scroll", onScroll));

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return (
    <div
      data-glow="1"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 -ml-[310px] -mt-[310px] h-[620px] w-[620px] rounded-full opacity-0 transition-opacity duration-[600ms]"
      style={{
        background:
          "radial-gradient(circle, rgba(249,118,93,0.13) 0%, rgba(249,118,93,0.05) 40%, rgba(249,118,93,0) 70%)",
      }}
    />
  );
}

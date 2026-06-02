"use client";

import { useEffect, useRef } from "react";

// Full-page interactive dot grid. Single rAF loop, pointer tracked via refs
// (never React state) so it stays smooth. Respects prefers-reduced-motion.
export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GAP = 30; // px between dots
    const BASE_R = 1; // base dot radius
    const RADIUS = 130; // cursor influence radius
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    // Read theme-driven colors from CSS vars so light/dark both look right.
    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        dot: styles.getPropertyValue("--dot").trim() || "168, 158, 200",
        glow: styles.getPropertyValue("--dot-glow").trim() || "217, 70, 239",
      };
    };
    let colors = readColors();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colors = readColors();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: px, y: py, active } = pointer.current;

      for (let x = GAP; x < width; x += GAP) {
        for (let y = GAP; y < height; y += GAP) {
          let intensity = 0;
          if (active) {
            const dx = x - px;
            const dy = y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < RADIUS) intensity = 1 - dist / RADIUS;
          }
          const r = BASE_R + intensity * 1.8;
          const baseAlpha = 0.18;
          const alpha = baseAlpha + intensity * 0.7;
          const rgb = intensity > 0.05 ? colors.glow : colors.dot;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // Static grid, no pointer interaction.
      draw();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      loop();
    }

    // Repaint on theme change (class toggle on <html>).
    const observer = new MutationObserver(() => {
      colors = readColors();
      if (reduceMotion) draw();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}

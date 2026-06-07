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
    const TAU = Math.PI * 2;
    // Max dots that can fall inside the cursor radius (πR²/GAP², plus margin).
    // Preallocated so the glow pass never allocates inside the rAF loop.
    const MAX_GLOW = 160;
    const glowX = new Float32Array(MAX_GLOW);
    const glowY = new Float32Array(MAX_GLOW);
    const glowI = new Float32Array(MAX_GLOW);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    // Read theme-driven colors from CSS vars so light/dark both look right.
    // `base` is the resting fillStyle for every dot, precomputed once per
    // theme change so the hot loop never builds a template-literal string.
    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const dot = styles.getPropertyValue("--dot").trim() || "132, 169, 140";
      const glow = styles.getPropertyValue("--dot-glow").trim() || "201, 123, 90";
      return { dot, glow, base: `rgba(${dot}, 0.18)` };
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

      // Single batched path + single fillStyle for every resting dot — the
      // dots inside the cursor's radius are sieved out (cheap |dx|/|dy|
      // bbox check before the sqrt) and queued for the glow pass below, so
      // nothing gets painted twice.
      let glowCount = 0;
      ctx.beginPath();
      for (let x = GAP; x < width; x += GAP) {
        const dx = x - px;
        const colNear = active && dx > -RADIUS && dx < RADIUS;
        for (let y = GAP; y < height; y += GAP) {
          if (colNear && glowCount < MAX_GLOW) {
            const dy = y - py;
            if (dy > -RADIUS && dy < RADIUS) {
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < RADIUS) {
                glowX[glowCount] = x;
                glowY[glowCount] = y;
                glowI[glowCount] = 1 - dist / RADIUS;
                glowCount++;
                continue;
              }
            }
          }
          ctx.moveTo(x + BASE_R, y);
          ctx.arc(x, y, BASE_R, 0, TAU);
        }
      }
      ctx.fillStyle = colors.base;
      ctx.fill();

      // Glow pass: at most ~MAX_GLOW dots, each gets its own radius/alpha/
      // color exactly as before — the only place per-dot fillStyle is paid.
      for (let i = 0; i < glowCount; i++) {
        const intensity = glowI[i];
        const r = BASE_R + intensity * 1.8;
        const alpha = 0.18 + intensity * 0.7;
        const rgb = intensity > 0.05 ? colors.glow : colors.dot;
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(glowX[i], glowY[i], r, 0, TAU);
        ctx.fill();
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

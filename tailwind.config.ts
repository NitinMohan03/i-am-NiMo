import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyanotype housing ramp: the room IS the blueprint blue, deep Prussian field to raised panel
        ink: {
          950: "#001634", // Void — deepest layer, dark text on cobalt fills
          900: "#002f58", // Housing — body bg in dark mode, the blueprint paper itself
          800: "#133f68", // Surface — elevated panels, input fill
          700: "#285077", // Riser — raised affordances, border-strong source
        },
        // Cobalt = the single instrument-glow accent, a brighter blue lit within the Prussian field
        accent: {
          cobalt: "#37a4d5",
          "cobalt-deep": "#0096c9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        // Cobalt duotone: the instrument-glow fill for identity, CTAs, user bubbles
        "gradient-brand": "linear-gradient(135deg, #37a4d5 0%, #0096c9 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounce-slow 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

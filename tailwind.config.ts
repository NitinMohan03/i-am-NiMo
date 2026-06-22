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
        // Slate-navy housing ramp: deep desaturated blue surfaces (cr0ybot palette)
        ink: {
          950: "#1d2233", // deepest — dark text on mint/teal fills
          900: "#262c40", // body bg tone in dark mode
          800: "#313850", // elevated panels, input fill
          700: "#3c4460", // raised affordances, border-strong source
        },
        // Teal/mint = the single accent (kept under the `cobalt` keys so existing
        // utility classes — bg-accent-cobalt, shadow-accent-cobalt — keep working)
        accent: {
          cobalt: "#84dcc6", // mint — fills, glows, active markers
          "cobalt-deep": "#4fb3a4", // teal — gradient end, deeper accent
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        // Mint→teal duotone: the fill for identity, CTAs, user bubbles, skill tiles
        "gradient-brand": "linear-gradient(135deg, #8ee3d0 0%, #4fb3a4 100%)",
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

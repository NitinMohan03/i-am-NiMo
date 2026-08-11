import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coral Dark. Dark-only: one near-black ground, one raised step, one accent.
        ground: {
          DEFAULT: "#151a22", // page + section field; also the text color on coral fills
          panel: "#1b212b", // raised blocks: thumbs, quote cards, chat panel
        },
        ink: {
          DEFAULT: "#e9edf3", // headings, primary copy
          soft: "#c3cbd8", // secondary copy
          muted: "#99a3b2", // body paragraphs, nav at rest
          dim: "#7d8798", // mono captions, footer meta
        },
        coral: {
          DEFAULT: "#f9765d", // the single accent — eyebrows, rules, CTAs, numbers
          light: "#ffa08c", // hover
          tint: "#ffb5a4", // accent text on tinted fills
        },
        // Hairlines carry the structure: cards are 1px grids, not shadows.
        line: {
          DEFAULT: "rgba(255,255,255,0.09)",
          soft: "rgba(255,255,255,0.07)",
          strong: "rgba(255,255,255,0.14)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 26s linear infinite",
        blink: "blink 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

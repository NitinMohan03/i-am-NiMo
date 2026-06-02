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
        // Deep near-black indigo base + purple/pink accents
        ink: {
          950: "#0a0814",
          900: "#0d0a1f",
          800: "#141029",
          700: "#1c1638",
        },
        accent: {
          purple: "#a855f7",
          violet: "#8b5cf6",
          pink: "#ec4899",
          fuchsia: "#d946ef",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(120deg, #a855f7 0%, #d946ef 50%, #ec4899 100%)",
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

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
        // Sage-slate housing ramp: deep console to raised panel
        ink: {
          950: "#1b262b",
          900: "#222e34",
          800: "#2f3e46",
          700: "#354f52",
        },
        // Clay = the rare instrument signal; sage = "live"/ok + soft accent
        accent: {
          clay: "#c97b5a",
          "clay-deep": "#b3654a",
          sage: "#84a98c",
          "sage-light": "#cad2c5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        // Subtle clay duotone for identity fills + primary actions (not text)
        "gradient-brand":
          "linear-gradient(135deg, #c97b5a 0%, #b3654a 100%)",
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

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#FAFAFB",
        surface: "#FFFFFF",
        "surface-raised": "#F1F5F9",
        "surface-border": "rgba(15, 23, 42, 0.08)",
        "surface-border-hover": "rgba(79, 70, 229, 0.35)",
        accent: {
          DEFAULT: "#4F46E5", // Modern Deep Indigo
          hover: "#4338CA",
          glow: "rgba(79, 70, 229, 0.20)",
          emerald: "#059669",
          violet: "#7C3AED",
        },
        foreground: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glow: "0 4px 20px -2px rgba(79, 70, 229, 0.25)",
        "glow-lg": "0 10px 30px -4px rgba(79, 70, 229, 0.35)",
        glass: "0 8px 30px 0 rgba(15, 23, 42, 0.06)",
        card: "0 2px 12px -2px rgba(15, 23, 42, 0.06), 0 1px 3px 0 rgba(15, 23, 42, 0.04)",
        "card-hover": "0 14px 34px -4px rgba(79, 70, 229, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.05)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

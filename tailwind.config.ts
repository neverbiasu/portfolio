import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./docs/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mocha: {
          base: "#1e1e2e",
          surface: "#313244",
          text: "#cdd6f4",
          primary: "#89b4fa",
          subtle: "#585b70",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains)",
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      maxWidth: {
        content: "1400px",
      },
      spacing: {
        sidebar: "320px",
        launcher: "60px",
      },
      borderRadius: {
        surface: "18px",
      },
      boxShadow: {
        surface: "0 16px 40px rgba(0, 0, 0, 0.35)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

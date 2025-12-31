import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./createPreset()", // Trick to make tailwind watch this file? No.
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./docs/**/*.{md,mdx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [createPreset()],
  theme: {
    extend: {
      colors: {
        mocha: {
          // Base colors
          base: "#1e1e2e",
          mantle: "#181825",
          crust: "#11111b",
          // Surface colors
          surface: "#313244",
          overlay: "#45475a",
          // Text colors
          text: "#cdd6f4",
          subtext: "#a6adc8",
          subtle: "#585b70",
          // Accent colors
          primary: "#89b4fa",
          blue: "#89b4fa",
          lavender: "#b4befe",
          sapphire: "#74c7ec",
          sky: "#89dceb",
          teal: "#94e2d5",
          green: "#a6e3a1",
          yellow: "#f9e2af",
          peach: "#fab387",
          maroon: "#eba0ac",
          red: "#f38ba8",
          mauve: "#cba6f7",
          pink: "#f5c2e7",
          flamingo: "#f2cdcd",
          rosewater: "#f5e0dc",
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

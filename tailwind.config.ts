import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        green: { DEFAULT: "#2C4434" },
        cream: "#F2EDE5",
        card: "#FDFBF7",
      },
    },
  },
  plugins: [],
};
export default config;

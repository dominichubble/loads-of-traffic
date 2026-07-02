import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        red: "var(--color-red)",
        yellow: "var(--color-yellow)",
      },
      fontFamily: {
        sans: "var(--font-poppins)",
      },
      keyframes: {
        bounceX: {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(6px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        bounceX: "bounceX 1.4s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

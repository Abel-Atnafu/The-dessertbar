import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFAF5",
          100: "#FAF7F2",
          200: "#F5EFE6",
          300: "#EDE3D4",
        },
        chocolate: {
          900: "#1A0D06",
          800: "#2C1A0E",
          700: "#3D2416",
          600: "#5C3822",
          500: "#8B4513",
          400: "#A0694A",
        },
        gold: {
          50: "#FBF6E9",
          300: "#E8D08A",
          400: "#D4B85A",
          500: "#C9A84C",
          600: "#B8942E",
          700: "#9A7A1E",
        },
        blush: {
          100: "#FDF0F0",
          200: "#F9DDDD",
          300: "#F2C4C4",
          400: "#E8A0A0",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

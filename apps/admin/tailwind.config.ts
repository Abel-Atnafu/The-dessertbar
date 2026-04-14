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
        gold: {
          400: "#D4B85A",
          500: "#C9A84C",
          600: "#B8942E",
        },
        chocolate: {
          800: "#2C1A0E",
          900: "#1A0D06",
        },
      },
    },
  },
  plugins: [],
};

export default config;

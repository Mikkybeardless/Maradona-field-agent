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
        orange: "#E65800",
        black: "#040421",
        grey: "#808080",
        "light-grey": "#DED9DD"
      },
      fontFamily: {
        'work-sans': ['var(--font-work-sans)']
      }
    },
  },
  plugins: [],
};
export default config;

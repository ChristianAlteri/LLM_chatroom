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
        purple2: {
          100: "#cbabeb",
          200: "#987db3",
          300: "#715d85",
          400: "#625073",
          500: "#554663",
          600: "#4a3d57",
          700: "#3f344a",
          800: "#342b3d",
          900: "#292230",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
export default config;

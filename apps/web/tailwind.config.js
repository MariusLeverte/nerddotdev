const config = require("ui/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      colors: {
        ...config.theme.extend.colors,
        primary: "#0b1e5b",
      },
    },
  },
  plugins: [],
};

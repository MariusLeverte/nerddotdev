const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: colors.blue[600], hover: colors.blue[800] },
        secondary: { DEFAULT: colors.purple[600], hover: colors.purple[800] },
        success: { DEFAULT: colors.green[600], hover: colors.green[800] },
        warning: { DEFAULT: colors.yellow[600], hover: colors.yellow[800] },
        error: { DEFAULT: colors.red[600], hover: colors.red[800] },
      },
      boxShadow: {
        DEFAULT: "0 4px 14px 0 rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

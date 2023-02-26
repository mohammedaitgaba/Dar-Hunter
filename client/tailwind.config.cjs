/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary and secondary are the dominant colors
        primary: "#000080", // navy blue (dark)
        secondary: "#ADD8E6", // light blue (dark)
        Myblack: "#050401", // blue (dark)
        Mygray: "#6E7271", // grey (dark)
        MylightGray: "#DEE5E5",
      },
    },
  },
  plugins: [],
};

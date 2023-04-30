/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        Black: "#151718",
        BlackPearl: "#242627",
        Purple: "#6E118C",
        DarkOrchid: "#B326B2",
        Mauvelous: "#EE91AA",
        Light: "#FEFEFE",
        Dark: "#686A6C"
      },
    },
    screens: {
      xs: "480px", 
      ss: "620px",
      md: "1060px",
      lg: "1280px",
      xl: "1700px",
    },
  },
  plugins: [],
};
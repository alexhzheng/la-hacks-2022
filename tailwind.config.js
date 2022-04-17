module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow Condensed", "sans-serif"],
      },
      width: {
        100: "35rem",
      },
      screens: {
        maxlg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        maxmd: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        maxsm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};

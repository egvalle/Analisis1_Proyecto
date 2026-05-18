export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        earth: "#3D2B1F",
        earth2: "#6B4C38",

        sand: "#F0E8D8",
        sand2: "#E4D8C4",

        leaf: "#2F6B3D",
        leaf2: "#4A7C59",

        sun: "#C8850A",

        sky: "#3A6B8A",

        danger: "#9E3A2A",

        background: "#FCFAF4",

        surface: "#FFFFFF",

        border: "#DDD3C0",

        text: "#2B2118",
        textSoft: "#6B5A49",
      },

      borderRadius: {
        xl2: "18px",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(61,43,31,.08)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
}
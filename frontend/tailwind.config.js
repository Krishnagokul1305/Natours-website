/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        primary: "linear-gradient(to right, #61dad5, #1e798b)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        ptext: "#1e798b",
        stext: "#61dad5",
      },
    },
  },
  plugins: [],
};

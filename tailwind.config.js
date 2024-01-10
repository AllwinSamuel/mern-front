/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode : "class",
  theme: {
    extend: {
      boxShadow:{
        "5xl": "20px 20px 50px rgba(0,0,0,0.5)"
      }
    },
  },
  plugins: [],
}


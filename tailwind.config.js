/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary' : ["Montserrat", "sans-serif"],
        'secondary' : ["Nunito Sans", "sans-serif"],
      },
      colors: {
        'button': ['FFCE1A'],
        'text': ['0D0842'],
      }
    },
  },
  plugins: [],
}

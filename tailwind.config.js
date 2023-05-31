/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#F5A',
        blue: '#39F'
      }
    },
  },
  plugins: [],
}
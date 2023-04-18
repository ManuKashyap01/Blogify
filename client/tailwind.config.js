/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        theme_light:'#FFFDE4',
        theme_dark:'#005AA7'
      }
    },
  },
  plugins: [],
}
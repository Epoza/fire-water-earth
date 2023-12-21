/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'Artifika': ['Artifika', 'Arvo', 'PT Serif'],
      },
      colors: {
        fire: {
          text:'#c2220a'
        },
        water: {
          text: '#0a72c2'
        },
        earth: {
          text: '#269d0a'
        }
      },
    },
  },
  plugins: [],
}


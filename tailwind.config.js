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
          text:'#c2220a',
          icon: '#d14a1e'
        },
        water: {
          text: '#0a72c2',
          icon: '#2592cb'
        },
        earth: {
          text: '#269d0a',
          icon: '#41b626'
        }
      },
    },
  },
  plugins: [],
}


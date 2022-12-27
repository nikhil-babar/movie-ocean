/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      font:{
        brand: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

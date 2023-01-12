/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'xs': '480px',

      'sm': '620px',

      'md': '768px',

      'lg': '1024px',


      'xl': '1280px',

      '1.5xl': '1450px',

      '2xl': '1536px',
    },
    extend: {
      font:{
        brand: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

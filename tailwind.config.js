/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9776a2',
        secondary: '#b3476ba6',
        cards: '#ddd1e2',
        primary_hue_purple: '#5C276E',
      },
      boxShadow: {
        cards: '0 0px 2px 0 rgba(221 ,209 ,226 , 1)',
        primaryNew: '0 0px 13px 0 #e1d0e9',
        secondary: '0 0px 30px 5px rgba(139 ,122 ,128 , 0.65)',
        sticky: '0 0 4px 0px grey',
      },
    },
  },
  plugins: [],
}

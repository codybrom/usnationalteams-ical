/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        red: '#B22234',
        blue: '#3C3B6E',
      },
      textColor: {
        red: '#B22234',
        blue: '#3C3B6E',
      },
    },
  },
  plugins: [require('daisyui')],
};

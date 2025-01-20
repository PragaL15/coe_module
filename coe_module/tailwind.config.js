/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "side-bar": "#FFB3A7",
        "theme-color": "#defaf3",
        "custom-blue": "#e3f2fd",
        "pale-blue": "#defaf3",
        "rec_bac": "#defaf3",
        "Add_details_bac": "#fcf4f0",
      },
      height: {
        "88": "22rem",
      },
      fontSize: {
        "xxs": "10px", // Smallest text size
      },
      fontFamily: {
        sans: ['Mona Sans', 'sans-serif'], // Use Mona Sans as the default sans-serif font
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

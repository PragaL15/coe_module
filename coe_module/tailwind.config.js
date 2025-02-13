/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "side-bar": "#404040",
        "theme-color": "#defaf3",
        "custom-blue": "#e3f2fd",
        "pale-blue": "#defaf3",
        "rec_bac": "#defaf3",
        "Add_details_bac": "#fcf4f0",
        "card-background": "#7FBBF6",
        "mild-bg":"#e6e6e6"
      },
      height: {
        "88": "22rem",
      },
      width: {
        '9/10': '90%',  
      },
      fontSize: {
        "xxs": "10px", 
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
 
  theme: {
    extend: {
      colors: {
        "side-bar": "#FFB3A7",
        "theme-color": "#defaf3",
        'custom-blue': '#e3f2fd',
        "pale-blue":'#defaf3',
        "rec_bac":'#defaf3',
        "Add_details_bac":'#fcf4f0'
      },
      height: {
        "88": "22rem",
      },
      fontSize: {
        "xxs": "10px", // Changed from text to fontSize
      },
      fontFamily: {
        sans: ['Mona Sans', 'sans-serif'], // Use Mona Sans as your default sans font
      },
      '.input-class-drop': {
        '@apply w-full h-10 border border-gray-300 rounded-md px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400': {},
      },
      '.input-class-inpbox':{
        '@apply w-full h-9 mt-2 border rounded p-3 text-sm':{},
      },
    
    },
  },
  plugins: [],
};
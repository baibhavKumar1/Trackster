/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'lg': {'min': '1201px','max':'1500px'},

      'md': {'min': '901px','max':'1200px'},

      'sm': {'max': '900px','min':'451px'},
      
      'xs':{'max':'450px','min':'0'}
    }
  },
  plugins: [],
}
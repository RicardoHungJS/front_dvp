/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      gridTemplateRows: {
        'withHeader': '6rem 1fr 1fr',
      },
      gridTemplateColumns: {
        'savedProfiles': '25% 1fr 1fr',
      }
    },
  },
  plugins: [],
}


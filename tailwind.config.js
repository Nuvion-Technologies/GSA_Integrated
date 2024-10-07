/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1D4ED8', // Custom primary color
        'secondary': '#6B7280', // Custom secondary color
      },
      fontFamily: {
        poppins : ['Poppins', 'Arial', 'sans-serif'], // Custom font
        oswald: ['Oswald', 'Arial', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [
  ],
}


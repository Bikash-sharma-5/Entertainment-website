/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'custom-gradient': 'linear-gradient(315deg, #2d3436 0%, #000000 74%)',
      },
    },
  },
  plugins: [],
}


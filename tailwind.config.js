/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          100: '#FFF5EE',
          200: '#FFE4C4',
          300: '#FFDAB9',
          400: '#FFCBA4',
        },
        lavender: {
          100: '#F5F0FF',
          200: '#E6E6FA',
          300: '#DCD0FF',
          400: '#B8A9C9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

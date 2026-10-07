/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        cursive: ['"Dancing Script"', 'cursive'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#729ec1',
          accent: '#ffffff',
          dark: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}

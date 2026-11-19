/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tv-green': '#548235',
        'tv-blue': '#4472C4',
        'tv-dark-green': '#456E2D',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        cursive: ['Caveat', 'Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
};


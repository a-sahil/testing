/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo 500
        secondary: '#a855f7', // Purple 500
        dark: '#1e293b', // Slate 800
        canvas: '#f8fafc', // Slate 50
      }
    },
  },
  plugins: [],
}
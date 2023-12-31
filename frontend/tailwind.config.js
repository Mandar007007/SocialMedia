/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 20px 50px -10px rgba(0, 0, 0, 0.3)',
      },
      borderWidth: {
        DEFAULT: '1px',
        '1': '0.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }

    },
  },
  screens: {
    sm: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  plugins: [],
}
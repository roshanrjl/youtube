/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure it scans all your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#111111",
        secondary: "#0e0d0d",
        tertiary: "#262525",
        textlight: "#aea9a9",
        hover:'#ffffff1c',
      },

    },
  },
  plugins: [],
}


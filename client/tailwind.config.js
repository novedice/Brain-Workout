/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'game-back': "url('./assets/backgroud.jpeg')",
      },
    },
  },
  plugins: [],
};

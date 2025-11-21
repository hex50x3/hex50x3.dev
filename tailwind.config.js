module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // soafer clean.
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
};
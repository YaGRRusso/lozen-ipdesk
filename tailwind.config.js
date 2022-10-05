/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
    },
    extend: {
      minHeight: {
        'screen-fill': '65vh',
      },
      maxHeight: {
        'screen-40': '40vh',
      },
      minWidth: {
        sm: '280px',
      },
    },
  },
  plugins: [],
}

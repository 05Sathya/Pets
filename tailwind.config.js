/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cherry: '#E63946',
        'cherry-dark': '#C42B38',
        ink: '#23262F',
        cream: '#FFF6EC',
        'cream-deep': '#FBEBDB',
        blush: '#FFE3D2',
        teal: '#0E9594',
        amber: '#FFB627',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
}

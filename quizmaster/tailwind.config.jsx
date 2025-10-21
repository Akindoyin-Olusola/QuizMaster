/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purplePrimary: '#6C5CE7',
        lavender: '#DCD6F7',
        gold: '#FFD700',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}

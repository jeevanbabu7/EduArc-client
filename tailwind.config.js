/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "Rubik": ['Rubik-Bold', 'sans-serif'],
        "Rubik-Bold": ['Rubik-Bold', 'sans-serif'],
        "Rubik-ExtraBold": ['Rubik-ExtraBold', 'sans-serif'],
        "Rubik-Medium": ['Rubik-Medium', 'sans-serif'],
        "Rubik-Regular": ['Rubik-Regular', 'sans-serif'],
        "Rubik-Light": ['Rubik-Light', 'sans-serif'],
        "Rubik-semibold": ['Rubik-semibold', 'sans-serif']

      },
      colors: {
        primay: {
          100: '#0061FE',
          200: '#E5EEFE',
          300: '#F1F8FF',
        },
        accent: {

        },
        black: {
          DEFAULT: '#000000',
          100: '#8CBE98',
          200: '#666876',
          300: '#191D31'
        },
        danger: {
          DEFAULT: '#F75555',
          100: '#FF0000',
          200: '#FF0000',
          300: '#FF0000'
        },
      }
    },
  },
  plugins: [],
}
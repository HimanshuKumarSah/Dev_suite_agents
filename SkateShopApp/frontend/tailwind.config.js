module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#CCFF00',
        accent: '#FF4500',
        background: '#F5F5F5',
      },
      fontFamily: {
        bold: ['Montserrat-Bold'],
        regular: ['Montserrat-Regular'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato','sans-serif'],
        ubuntu: ['ubuntu', 'serif']
      },
      colors: {
        bodyColor: "#f1faee",
        buttonColor: "#457b9d",
        deleteTxt: "#cc0f35",
        logoutBtn: "#FA9EB2",
        deleteBtn: "#F76484",
        editTxt: "#946c00",
        editBtn: "#fffaeb"
      }
    },
  },
  plugins: [],
}

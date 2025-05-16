/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C16CD",
        "dark-primary": "#16119F",
      },
      backgroundColor: { primary: "#330AF5" },
      fontFamily: { primary: ["Poppins", "sans-serif"] },
      backgroundImage: { login: "url('/images/bg-login.jpg')" },
    },
  },
  plugins: [],
};

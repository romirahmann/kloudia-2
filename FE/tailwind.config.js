/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C16CD",
        "dark-primary": "#16119F",
      },
      fontFamily: { primary: ["Poppins", "sans-serif"] },
      backgroundImage: { login: "url('/images/bg-login.jpg')" },
    },
  },
  plugins: [],
};

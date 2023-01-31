/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ar: {
          principal: "#820000",
          bg: "#f8f6f2",
          "text-card": "#585556",
          collapse: "#804149",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

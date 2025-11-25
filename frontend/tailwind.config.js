module.exports = {
  darkMode: "media", // OS ke hisab se light/dark
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
   plugins: [require('@tailwindcss/line-clamp')],
};

module.exports = {
  content: ["./{app,public}/**/*.{js,ts,jsx,tsx,md}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}

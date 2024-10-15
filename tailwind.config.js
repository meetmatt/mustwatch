/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      screens: {
        other: { min: "340px", max: "1200px" },
      },
    },
  },
  plugins: [flowbite.plugin()],
};

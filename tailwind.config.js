/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        whisper: "#f9f9f9",
        dune: "#d4cab8",
        carbon: "#161614",
        metro: "#9c9d9f",
        graphite: "#5e5e5d",
        coffee: "#4f3b30",
        oak: "#997c67",
      },
    },
  },
  plugins: [],
};

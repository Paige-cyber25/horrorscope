
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          opensans: ["var(--font-opensans)", "sans-serif"],
          bevietnampro: ["var(--font-bevietnampro)", "sans-serif"],
        },
        color: {
          "rodo": "#D6280E",
          "gray-300": "#D1D5DB",
          "gray-500": "#667185",
          "gray-900": "#101928",
          "gray-50": "#F9FAFB",
          "gray-600": "#515466",
          "gray-800": "#1D2739",
          "gray-900": "#101928",
          "red-200": "#8B0000",
          "primary-400": "#0A0A0A",
          "ghost-white": "#F8F8FF",
          "midnight-black": "#121212",
          "neutral-black": "#1F2232",
          "ferry-blue": "#14213D",
        }
      },
    },
    plugins: [],
  };
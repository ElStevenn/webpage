/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { xl: "1200px" },
    },
    extend: {
      colors: {
        brand: {
          blue: "#58A6FF",
          coral: "#F78166",
          amber: "#ffd883",
          dark: "#0D1117",
          dark2: "#161B22",
        },
      },
      backgroundImage: {
        'hero-gradient': "linear-gradient(135deg,#0D1117 0%,#161B22 100%)",
      },
      fontFamily: {
        heading: ['Inter','system-ui','sans-serif'],
        body: ['Inter','system-ui','sans-serif'],
      },
      boxShadow: {
        glowBlue: "0 0 25px -5px rgba(88,166,255,0.5)",
        glowCoral: "0 0 25px -5px rgba(247,129,102,0.5)",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease forwards',
      },
    },
  },
  plugins: [],
}

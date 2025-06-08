/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'Montserrat', 'Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#f5faff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf2fa',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        gradientStart: '#a1c4fd',
        gradientEnd: '#c2e9fb',
        darkBg: '#18181b',
        lightBg: '#f8fafc',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(161,196,253,0.3) 100%)',
      },
    },
  },
  plugins: [],
}


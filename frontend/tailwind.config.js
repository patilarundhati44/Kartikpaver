/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        dark: {
          50: '#f8f8f8',
          100: '#e8e8e8',
          200: '#c8c8c8',
          300: '#a0a0a0',
          400: '#707070',
          500: '#505050',
          600: '#383838',
          700: '#282828',
          800: '#1a1a1a',
          900: '#0f0f0f',
        },
        industrial: {
          steel: '#4a5568',
          concrete: '#718096',
          rust: '#c05621',
          charcoal: '#2d3748',
          smoke: '#e2e8f0',
        }
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'concrete-texture': "url('/images/concrete-texture.jpg')",
        'hero-pattern': "linear-gradient(135deg, #1a1a1a 0%, #2d3748 50%, #1a1a1a 100%)",
        'orange-gradient': "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'industrial': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'orange-glow': '0 0 20px rgba(249, 115, 22, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

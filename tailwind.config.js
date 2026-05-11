/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#006D37',
          light: '#008c47',
          dark: '#004a25',
        },
        glow: {
          DEFAULT: '#2ECC71',
          light: '#52d88a',
          dark: '#25a85c',
        },
        ice: {
          DEFAULT: '#F8F9FA',
          light: '#ffffff',
          dark: '#e9ecef',
        },
        graphite: {
          DEFAULT: '#333333',
          light: '#4d4d4d',
          dark: '#1a1a1a',
        }
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        brand: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionDuration: {
        'fast': '150ms',
        'default': '250ms',
        'page': '400ms',
        'slow': '800ms',
      },
    },
  },
  plugins: [],
}

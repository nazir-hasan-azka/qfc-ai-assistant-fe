import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        qfc: {
          primary: '#1B4B8C',
          secondary: '#C8102E',
          accent: '#00A651',
          dark: '#1A1A1A',
          light: '#F5F5F5',
        },
        brand: {
          50: '#E8EDF4',
          100: '#D1DBE9',
          200: '#A3B7D3',
          300: '#7593BD',
          400: '#476FA7',
          500: '#1B4B8C',
          600: '#163C70',
          700: '#112D54',
          800: '#0C1E38',
          900: '#060F1C',
        },
        accent: {
          50: '#FEE7EC',
          100: '#FDCFD9',
          200: '#FB9FB3',
          300: '#F96F8D',
          400: '#F73F67',
          500: '#C8102E',
          600: '#A00D25',
          700: '#780A1C',
          800: '#500713',
          900: '#280309',
        },
        success: {
          50: '#E6F7ED',
          100: '#CCEFDB',
          200: '#99DFB7',
          300: '#66CF93',
          400: '#33BF6F',
          500: '#00A651',
          600: '#008541',
          700: '#006431',
          800: '#004321',
          900: '#002110',
        },
        warning: {
          50: '#FFF7E6',
          100: '#FFEFCC',
          200: '#FFDF99',
          300: '#FFCF66',
          400: '#FFBF33',
          500: '#FFAF00',
          600: '#CC8C00',
          700: '#996900',
          800: '#664600',
          900: '#332300',
        },
        error: {
          50: '#FEE7EC',
          100: '#FDCFD9',
          200: '#FB9FB3',
          300: '#F96F8D',
          400: '#F73F67',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#450A0A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-up': 'fadeUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;

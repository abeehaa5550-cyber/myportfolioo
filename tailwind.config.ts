import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 28px 80px rgba(99, 102, 241, 0.16)',
        glow: '0 32px 120px rgba(99, 102, 241, 0.12)',
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      backgroundImage: {
        'halo-gradient': 'radial-gradient(circle at top, rgba(99,102,241,0.22), transparent 40%), radial-gradient(circle at 90% 20%, rgba(14,165,233,0.12), transparent 18%)',
      },
    },
  },
  plugins: [],
}

export default config

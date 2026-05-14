import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './data/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 30px 90px rgba(237, 228, 212, 0.08)',
        glow: '0 30px 80px rgba(237, 228, 212, 0.14)',
      },
      colors: {
        sand: {
          50: '#FBF7EE',
          100: '#F5EDE4',
          200: '#EDE4D4',
          300: '#D8CDBA',
          400: '#C5B49F',
          500: '#A9977F',
          600: '#8C7561',
          700: '#6F5D49',
          800: '#52473A',
          900: '#40372D',
        },
        graphite: {
          900: '#111111',
          800: '#1A1A1A',
          700: '#232323',
          600: '#2A2A2A',
          500: '#333333',
          400: '#3F3F3F',
          300: '#505050',
          200: '#6D6D6D',
        },
      },
      backgroundImage: {
        'terminal-grid': 'radial-gradient(circle at top left, rgba(237,228,212,0.08), transparent 18%), radial-gradient(circle at 90% 25%, rgba(237,228,212,0.04), transparent 14%)',
      },
    },
  },
  plugins: [],
}

export default config

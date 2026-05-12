import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B0F1E',
          50: '#E8E9F0',
          900: '#0B0F1E',
        },
        saffron: {
          DEFAULT: '#FF6500',
          dark: '#E05800',
          dim: 'rgba(255,101,0,0.1)',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          200: '#F0ECE4',
          300: '#E4DDD2',
        },
      },
      fontFamily: {
        sans: ['var(--font-syne)', 'sans-serif'],
        serif: ['var(--font-literata)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 1.3s',
        'float-slow': 'float 5s ease-in-out infinite 0.6s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: 'var(--ivory-50)',
          100: 'var(--ivory-100)',
          200: 'var(--ivory-200)',
        },
        gold: {
          300: 'var(--gold-300)',
          500: 'var(--gold-500)',
          700: 'var(--gold-700)',
        },
        crimson: {
          700: 'var(--crimson-700)',
          900: 'var(--crimson-900)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
        },
      },
      fontFamily: {
        'artistic': ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        'bangla-serif': ['"Noto Serif Bengali"', 'serif'],
        'bangla-sans': ['"Hind Siliguri"', 'sans-serif'],
        'english-display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'english-sans': ['Inter', 'system-ui', 'sans-serif'],
        'arabic': ['Amiri', 'serif'],
      },
      boxShadow: {
        'gold-card': '0 10px 30px -5px rgba(94, 21, 32, 0.06), 0 4px 12px -2px rgba(58, 42, 34, 0.04)',
        'crimson-btn': '0 4px 14px -2px rgba(122, 31, 46, 0.3)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.0' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

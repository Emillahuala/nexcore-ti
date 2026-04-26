import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy-deep':   '#0C2C5C',
        'navy-brand':  '#1C4F8F',
        'blue-action': '#2E8AD0',
        'teal-accent': '#6ECFD1',
        'teal-mid':    '#3FA6B5',
        'bg-dark':     '#0F1114',
        'bg-dark-2':   '#131720',
        'bg-card':     '#161C27',
        'bg-card-2':   '#1A2236',
        'text-primary':   '#FFFFFF',
        'text-secondary': '#C8CDD4',
        'text-muted':     '#8A919A',
        'color-error':    '#FF6B6B',
        'color-success':  '#6ECFD1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grad-hero':  'linear-gradient(135deg, #0C2C5C 0%, #1C4F8F 50%, #2E8AD0 100%)',
        'grad-brand': 'linear-gradient(135deg, #2E8AD0 0%, #6ECFD1 100%)',
        'grad-text':  'linear-gradient(135deg, #2E8AD0 0%, #6ECFD1 100%)',
        'grad-card':  'linear-gradient(145deg, rgba(28,79,143,.12) 0%, rgba(46,138,208,.06) 100%)',
      },
      boxShadow: {
        'glow':  '0 0 40px rgba(46,138,208,.25)',
        'card':  '0 4px 24px rgba(12,44,92,.3), 0 1px 4px rgba(15,17,20,.4)',
        'brand': '0 4px 20px rgba(46,138,208,.35), inset 0 1px 0 rgba(255,255,255,.15)',
        'sm':    '0 2px 8px rgba(15,17,20,.4)',
        'md':    '0 8px 24px rgba(15,17,20,.5)',
        'lg':    '0 20px 60px rgba(15,17,20,.6)',
      },
      borderColor: {
        subtle: 'rgba(200,205,212,.08)',
        mid:    'rgba(200,205,212,.14)',
        accent: 'rgba(46,138,208,.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out':    'cubic-bezier(0.0, 0.0, 0.2, 1)',
      },
      screens: {
        'xs': '480px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 1.25rem))' } // 1.25rem is for gap-5
        }
      },
      animation: {
        marquee: 'marquee 80s linear infinite',
      }
    },
  },
  plugins: [],
}

export default config

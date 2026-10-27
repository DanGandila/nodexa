import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#f4f5f7',
        ink: '#15171a',
        graphite: '#5f6470',
        obsidian: '#0e1013',
        ash: '#9aa1ad',
        signal: '#2f5bea',
        'signal-lift': '#6d8fff',
        'signal-deep': '#2749c9',
        hairline: 'rgba(16, 20, 28, 0.09)',
        'hairline-strong': 'rgba(16, 20, 28, 0.14)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          '"Segoe UI"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          '"SF Mono"',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        // Negative tracking grows with type size; body stays normal.
        display: '-0.038em',
        heading: '-0.028em',
        lockup: '-0.026em',
        title: '-0.014em',
        label: '0.1em',
      },
      maxWidth: {
        shell: '67.5rem',
      },
      spacing: {
        // The section rhythm, defined once so every bay breathes the same.
        bay: '7.5rem',
        'bay-sm': '4.5rem',
      },
    },
  },
  plugins: [],
};

export default config;

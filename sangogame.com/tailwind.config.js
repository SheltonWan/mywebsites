/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sango-bg':       '#0a0a12',
        'sango-surface':  '#12121e',
        'sango-card':     '#1a1a2e',
        'sango-border':   '#2a2a40',
        'sango-gold':     '#d4a853',
        'sango-gold-dim': '#a8842f',
        'sango-red':      '#c0392b',
        'sango-text':     '#e8e6e0',
        'sango-text-dim': '#9a9890',
        'sango-accent':   '#e2c07a',
      },
      fontFamily: {
        heading: ["'Noto Serif SC'", "'Songti SC'", 'serif'],
        body:    ["'Noto Sans SC'", "'PingFang SC'", "'Microsoft YaHei'", 'sans-serif'],
      },
      animation: {
        'shimmer':    'shimmer 4s linear infinite',
        'float':      'float 8s ease-in-out infinite',
        'bounce-arr': 'bounceArr 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease both',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-30px)' },
        },
        bounceArr: {
          '0%, 100%': { transform: 'rotate(45deg) translateY(0)', opacity: '0.5' },
          '50%':      { transform: 'rotate(45deg) translateY(8px)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

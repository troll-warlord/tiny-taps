/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#FF6584',
        accent: '#43D7A0',
        warning: '#FFD166',
        danger: '#EF476F',
        success: '#06D6A0',
        background: '#F0F4FF',
        surface: '#FFFFFF',
        text: '#2D3748',
        muted: '#718096',
      },
      fontFamily: {
        kids: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-12px)' },
          '40%': { transform: 'translateX(12px)' },
          '60%': { transform: 'translateX(-8px)' },
          '80%': { transform: 'translateX(8px)' },
        },
        scaleUp: {
          from: { transform: 'scale(0.3)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'scale-up': 'scaleUp 0.35s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}

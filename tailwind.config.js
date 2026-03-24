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
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-14px) rotate(4deg)' },
          '66%': { transform: 'translateY(-7px) rotate(-3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg) scale(1)' },
          '50%': { transform: 'rotate(6deg) scale(1.12)' },
        },
        pop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '70%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'scale-up': 'scaleUp 0.35s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out both',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        wiggle: 'wiggle 1.4s ease-in-out infinite',
        pop: 'pop 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
    },
  },
  plugins: [],
}

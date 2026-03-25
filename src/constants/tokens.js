// Design tokens - single source of truth for colours, spacing and typography.
// These values are mirrored in tailwind.config.js so that both CSS utilities
// and JS logic can consume the same scale.

export const colors = {
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
}

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
}

export const fontSizes = {
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
  emoji: '5rem',
}

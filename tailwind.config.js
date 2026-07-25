/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      colors: {
        primary: '#22C55E',
        success: '#22C55E',
        warning: '#F59E0B',
        critical: '#EF4444',
        info: '#3B82F6',
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E4E4E7'
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
      borderRadius: {
        'none': '0',
        'sm': '6px',
        DEFAULT: '10px',
        'md': '14px',
        'lg': '18px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.02)',
        DEFAULT: '0 4px 12px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02)',
        'md': '0 8px 24px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.02)',
        'lg': '0 16px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.2)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.2)',
        'glow-critical': '0 0 20px rgba(239, 68, 68, 0.2)',
      },
      transitionDuration: {
        DEFAULT: '250ms',
        'fast': '150ms',
        'slow': '400ms',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
    },
    lineHeight: {
      normal: '140%',
      relaxed: '160%',
    },
    colors: {
      transparent: 'transparent',
      red: {
        500: '#F75A68',
      },
      green: {
        100: '#50B2C0',
        200: '#255D6A',
        300: '#0A313C',
      },
      purple: {
        100: '#8381D9',
        200: '#2A2879',
      },
      gray: {
        100: '#F8F9FC',
        200: '#E6E8F2',
        300: '#D1D6E4',
        400: '#8D95AF',
        500: '#303F73',
        600: '#252D4A',
        700: '#181C2A',
        800: '#0E1116',
      },
    },
    fontFamily: {
      sans: ['var(--font-nunito)'],
    },
    extend: {
      aspectRatio: {
        'book-cover': '108 / 152',
      },
      backgroundImage: {
        'gradient-horizontal':
          'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
        'gradient-vertical':
          'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
      },
    },
  },
  plugins: [],
}
export default config

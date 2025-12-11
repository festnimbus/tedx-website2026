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
        tedx: {
          red: '#EB0028',
          'red-dark': '#C70021',
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            light: '#F5F5F5',
            DEFAULT: '#E0E0E0',
            dark: '#333333',
          }
        },
      },
      fontFamily: {
        helvetica: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

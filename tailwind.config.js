module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '840px',
      xl: '840px',
    },
    boxShadow: {
      DEFAULT: 'rgba(0, 0, 0, 0.08) 0px 12px 30px -10px',
      lg: 'rgba(0, 0, 0, 0.08) 0px 12px 30px -10px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

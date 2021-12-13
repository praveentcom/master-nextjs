module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
    container: {
      center: true,
    },
    boxShadow: {
      DEFAULT: 'rgba(0, 0, 0, 0.08) 0px 12px 30px -10px',
      lg: 'rgba(0, 0, 0, 0.08) 0px 12px 30px -10px'
    }
  },
  variants: {
    opacity: ["disabled"],
    cursor: ["disabled"],
    backgroundColor: ({ after }) => after(['disabled']),
    textColor: ["disabled"],
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

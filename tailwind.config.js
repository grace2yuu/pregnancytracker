/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F4B8C1',
        'blush-soft': '#FBE3E7',
        sage: '#A8C5A0',
        'sage-soft': '#E2EFDD',
        lavender: '#C4B5D4',
        'lavender-soft': '#EBE4F1',
        cream: '#FDF6F0',
        charcoal: '#4A4A4A',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 16px rgba(74, 74, 74, 0.08)',
      },
    },
  },
  plugins: [],
};

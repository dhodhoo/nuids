/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#58A5DA',
        'primary-soft': 'rgba(88,165,218,0.1)',
        green: {
          DEFAULT: '#587F74',
          light: '#A6CFC2',
          dark: '#41493E',
        },
        'bg-app': '#F4F3EE',
        'header-bg': '#F9F9F6',
        'nav-bg': '#EBF1F2',
        'gradient-top': '#C0E1D2',
        'gradient-mid': '#E5EEE4',
        'gradient-bottom': '#F6F4E8',
        'input-bg': '#E0E0E0',
        'border-card': 'rgba(192,201,187,0.3)',
        'text-muted': '#6B7280',
        'text-body': '#41493E',
        'blue-info': '#00629E',
        'red-alert': '#BA1A1A',
        'status-ok': '#4CAF50',
        'status-warn': '#FFB300',
        'status-consult': '#EA6A6A',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'mobile': '0 30px 60px rgba(0,0,0,0.18)',
        'card': '0 4px 8px rgba(0,0,0,0.08)',
        'card-sm': '0 2px 6px rgba(0,0,0,0.06)',
      },
      fontFamily: {
        sans: ['Poppins', 'Nunito', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '402px',
      },
    },
  },
  plugins: [],
}

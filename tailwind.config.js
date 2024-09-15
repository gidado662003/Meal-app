/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: '#FF6363',
  			secondary: {
  				'100': '#E2E2D5',
  				'200': '#888883'
  			},
  			tertiary: '#e74c3c'
  		},
  		fontFamily: {
  			sans: ["Inter", "sans-serif"],
  			serif: ["Playfair Display", "serif"],
  			food: ["Playwrite CU", "cursive"],
  			foodlocation: ["Pixelify Sans", "sans-serif"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

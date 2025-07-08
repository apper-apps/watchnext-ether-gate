/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B46C1',
        secondary: '#1E293B',
        accent: '#F59E0B',
        surface: '#1F2937',
        background: '#0F172A',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        netflix: '#E50914',
        prime: '#00A8E1',
        disney: '#113CCF',
        hulu: '#1CE783',
        hbo: '#762F9D',
        apple: '#000000',
        paramount: '#0064FF',
        peacock: '#F74C00'
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Arial Black', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6B46C1 0%, #9333EA 100%)',
        'gradient-surface': 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #6B46C1' },
          '100%': { boxShadow: '0 0 20px #6B46C1' }
        }
      }
    }
  },
  plugins: [],
}
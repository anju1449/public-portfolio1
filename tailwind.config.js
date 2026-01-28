/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            colors: {
                neon: {
                    blue: '#00d4ff',
                    'blue-light': '#33ddff',
                    'blue-dark': '#0099cc',
                    purple: '#b794f4',
                    'purple-light': '#d4b3ff',
                    'purple-dark': '#8b5cf6',
                    pink: '#ff0080',
                    'pink-light': '#ff33a1',
                    'pink-dark': '#cc0066',
                    green: '#00ff9f',
                    'green-light': '#33ffb3',
                    'green-dark': '#00cc7f',
                    cyan: '#00ffff',
                    orange: '#ff6b35',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'gradient-shift': 'gradient-shift 3s ease infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-down': 'slide-down 0.5s ease-out',
                'fade-in': 'fade-in 0.6s ease-out',
                'scale-in': 'scale-in 0.4s ease-out',
                'spin-slow': 'spin 3s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
                        filter: 'brightness(1)',
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)',
                        filter: 'brightness(1.2)',
                    },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
                'neon-purple': '0 0 20px rgba(183, 148, 244, 0.5), 0 0 40px rgba(183, 148, 244, 0.3)',
                'neon-pink': '0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3)',
                'neon-green': '0 0 20px rgba(0, 255, 159, 0.5), 0 0 40px rgba(0, 255, 159, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}

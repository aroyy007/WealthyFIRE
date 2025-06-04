
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
                charcoal: '#1A1A1A',
                platinum: '#E5E4E2',
                softdark: '#2D2D2D',
                goldLight: '#FFD700',
                goldDark: '#C5A42E',
                emerald: '#00C49A',
                neonYellow: '#FFD700',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'display': ['Neue Haas Grotesk', 'Inter', 'sans-serif'],
            },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'counter': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'gold-glow': {
                    '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
                    '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)' },
                    '100%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' }
                },
                'float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'counter': 'counter 1s ease-out forwards',
                'gold-glow': 'gold-glow 1.5s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'neon-pulse': 'gold-glow 1.5s ease-in-out infinite'
			},
            backgroundImage: {
                'gold-gradient': 'linear-gradient(to right, #FFD700, #C5A42E)',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

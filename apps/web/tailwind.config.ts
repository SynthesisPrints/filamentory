import sharedConfig from '@repo/tailwind-config';
import { Config } from 'tailwindcss';

const config = {
	...sharedConfig,
	theme: {
		extend: {
			keyframes: {
				fadeInPing: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'50%': { transform: 'scale(1)', opacity: '1' },
					'75%': { transform: 'scale(1.25)', opacity: '0' },
					'100%': { transform: 'scale(1.5)', opacity: '0' },
				},
			},
			animation: {
				'fade-in-ping': 'fadeInPing 2s infinite',
			},
		},
	},
} satisfies Config;

export default config;

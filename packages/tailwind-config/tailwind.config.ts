import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {},
	plugins: [],
} satisfies Config;

export default config;

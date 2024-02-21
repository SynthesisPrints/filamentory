import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';
import { Config } from 'tailwindcss';
import { green, lime, orange, red, sky, white, zinc } from 'tailwindcss/colors';

type DaisyUiTheme = {
	primary: string;
	'primary-content'?: string;
	secondary: string;
	'secondary-content'?: string;
	accent: string;
	'accent-content'?: string;
	neutral: string;
	'neutral-content'?: string;
	'base-100': string;
	'base-200'?: string;
	'base-300'?: string;
	'base-content'?: string;
	info?: string;
	'info-content'?: string;
	success?: string;
	'success-content'?: string;
	warning?: string;
	'warning-content'?: string;
	error?: string;
	'error-content'?: string;
};

const darkTheme: Partial<DaisyUiTheme> = {
	'base-100': zinc[900],
	'base-200': zinc[800],
	'base-300': zinc[700],
	primary: sky[500],
	secondary: zinc[700],
	accent: orange[600],

	error: red[800],
	info: sky[800],
	success: lime[800],
	warning: orange[800],
};

const lightTheme: Partial<DaisyUiTheme> = {
	...darkTheme,
	'base-100': white,
	'base-200': zinc[200],
	'base-300': zinc[300],

	error: red[400],
	info: sky[400],
	success: green[400],
	warning: orange[400],
};

const config: Config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				dark: {
					...themes.dark,
					...darkTheme,
				},
				light: {
					...themes.light,
					...lightTheme,
				},
			},
		],
	},
};

export default config;

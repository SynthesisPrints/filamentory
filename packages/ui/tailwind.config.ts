import sharedConfig from '@repo/tailwind-config';
import { Config } from 'tailwindcss';

const config = {
	...sharedConfig,
} satisfies Config;

export default config;

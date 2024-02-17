import sharedConfig from '@repo/tailwind-config';
import { Config } from 'tailwindcss';

const config = {
	content: sharedConfig.content,
	presets: [sharedConfig],
} satisfies Config;

export default config;

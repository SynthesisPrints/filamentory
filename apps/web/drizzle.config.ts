import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
	schema: './db/schema.ts',
	out: './db/drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env['DATABASE_URL']!,
	},
} satisfies Config;

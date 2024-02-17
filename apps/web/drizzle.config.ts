import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
	schema: "./db/schema.ts",
	out: "./db/drizzle",
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env["DATABASE_URL"]!,
	},
} satisfies Config;
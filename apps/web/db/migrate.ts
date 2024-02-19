import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const runMigrate = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined');
	}

	console.log('NODE ENV: ', process.env.NODE_ENV);
	if (process.env.NODE_ENV === 'development') {
		console.log('Skipping migrations for development environment');
		process.exit(0);
	}

	const databaseUrl = drizzle(postgres(`${process.env.DATABASE_URL}`, { ssl: 'require', max: 1 }));

	console.log('⏳ Running migrations...');

	const start = Date.now();

	await migrate(databaseUrl, { migrationsFolder: './db/drizzle' });

	const end = Date.now();

	console.log(`✅ Migrations completed in ${end - start}ms`);

	process.exit(0);
};

runMigrate().catch((err) => {
	console.error('❌ Migration failed');
	console.error(err);
	process.exit(1);
});

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runMigrate = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined');
	}

	console.log('VERCEL_ENV', process.env.VERCEL_ENV);
	console.log('VERCEL_GIT_COMMIT_REF', process.env.VERCEL_GIT_COMMIT_REF);

	if (process.env.VERCEL_GIT_COMMIT_REF === 'develop') {
		console.log(`✅ Skipping migrations for develop branch`);
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

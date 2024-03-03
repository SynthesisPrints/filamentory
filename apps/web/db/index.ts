import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// create the connection
export const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);

export const db = drizzle(sql);

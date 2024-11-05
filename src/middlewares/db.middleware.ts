import { createMiddleware } from 'hono/factory';
import { BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import schema from '../db/schema/index';

let db: DbContext | null = null;
// inyect DBcontext in the hono controller
export const useDB = createMiddleware<ContextExtended>(async (c, next) => {
	if (!db) {
		// Initialize DB once
		const client = new Database(process.env.DB_FILE_NAME!);
		db = drizzle({ client, schema });
		console.log('Data Base Conected');
	}

	c.set('db', db);
	return await next();
});

export type DbContext = BunSQLiteDatabase<typeof schema>;

export interface ContextExtended {
	Variables: {
		db: DbContext;
	};
	Bindings: {
		TURSO_DATABASE_URL: string;
		TURSO_AUTH_TOKEN: string;
		JWT_SECRET: string;
	};
}

import { createMiddleware } from 'hono/factory';
import { BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite';
import { Context } from 'hono';
import { Database } from 'bun:sqlite';

let db: DbContext | null = null;

// inyect DBcontext in the hono controller
export const useDB = createMiddleware<Env>(async (c, next) => {
	// Initialize DB
	if (!db) {
		const client = new Database(process.env.DB_FILE_NAME!);
		db = drizzle({ client });
		console.log('Data Base Conected');
	}

	c.set('db', db);
	return await next();
});

export type DbContext = BunSQLiteDatabase<Record<string, never>> & {
	$client: Database;
};

interface Env extends Context {
	Variables: {
		db: BunSQLiteDatabase<Record<string, never>> & {
			$client: Database;
		};
	};
}

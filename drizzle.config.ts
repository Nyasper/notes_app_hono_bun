import { defineConfig } from 'drizzle-kit';

const {
	DB_FILE_NAME: url,
	TURSO_AUTH_TOKEN: token,
	JWT_SECRET: secret,
} = process.env;

declare module 'bun' {
	interface Env {
		TURSO_DATABASE_URL: string;
		TURSO_AUTH_TOKEN: string;
		JWT_SECRET: string;
	}
}

if (!url || !token || !secret) throw new Error('env variables missing');

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema',
	dialect: 'sqlite',
	dbCredentials: {
		url,
	},
});

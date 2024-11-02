import { defineConfig } from 'drizzle-kit';

const { DB_FILE_NAME: url } = process.env;

if (!url) throw new Error('env URL sqlite not provided');

export default defineConfig({
	out: './drizzle',
	schema: [
		'./src/db/schemas/user.schema.ts',
		'./src/db/schemas/notes.schema.ts',
	],
	dialect: 'sqlite',
	dbCredentials: {
		url,
	},
});

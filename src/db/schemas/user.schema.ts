import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { password, randomUUIDv7 } from 'bun';
import { notesTable } from './notes.schema';

// Tables
export const usersTable = sqliteTable('users', {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	username: text({ length: 16 }).notNull().unique(),
	password: text({ length: 26 }).notNull(),
	admin: integer({ mode: 'boolean' }).default(false),
	created: text().default(sql`(CURRENT_DATE)`),
});

// Relations
export const usersRelation = relations(usersTable, ({ many }) => ({
	notes: many(notesTable),
}));

export type userTypeS = typeof usersTable.$inferSelect;
export type userTypeI = typeof usersTable.$inferInsert;

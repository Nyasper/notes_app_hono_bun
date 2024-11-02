import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as randomUUIDv7 } from 'uuid';

// Tables
export const usersTable = sqliteTable('users', {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	username: text().notNull(),
	email: text().notNull().unique(),
	created: text().default(sql`(CURRENT_DATE)`),
});

export const notesTable = sqliteTable('notes', {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	title: text({ length: 70 }).notNull(),
	description: text({ length: 1000 }),
	userId: text().references(() => usersTable.id),
	created: text().default(sql`(CURRENT_DATE)`),
});

// Relations
export const usersRelation = relations(usersTable, ({ many }) => ({
	notes: many(notesTable),
}));

export type userTypeS = typeof usersTable.$inferSelect;
export type userTypeI = typeof usersTable.$inferInsert;

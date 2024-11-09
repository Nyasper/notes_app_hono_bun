import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { randomUUIDv7 } from 'bun';
import { generateTodayDateFormatted, notes } from './notes';

// Tables
export const users = sqliteTable('users', {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	username: text({ length: 16 }).notNull().unique(),
	password: text({ length: 26 }).notNull(),
	admin: integer({ mode: 'boolean' }).default(false),
	created: text().$defaultFn(() => generateTodayDateFormatted()),
});

export const usersRelations = relations(users, ({ many }) => ({
	notes: many(notes),
}));

export type UserTypeS = typeof users.$inferSelect;
export type UserTypeI = typeof users.$inferInsert;

// export type UserTypeWidthNotes = UserTypeS & NotesTypeS;

// export interface UserTypeWidthNotes extends UserTypeS {
// 	notes: NotesTypeS[];
// }

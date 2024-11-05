import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { randomUUIDv7 } from 'bun';
import { users } from './user';
import { relations } from 'drizzle-orm';

export const notes = sqliteTable('notes', {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	title: text({ length: 70 }).notNull(),
	description: text({ length: 1000 }),
	userId: text().references(() => users.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	created: text().default(new Date().toString()),
});

export const notesRelations = relations(notes, ({ one }) => ({
	user: one(users, {
		fields: [notes.userId],
		references: [users.id],
	}),
}));

export type NotesTypeS = typeof notes.$inferSelect;
export type NotesTypeI = typeof notes.$inferInsert;

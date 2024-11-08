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
	created: text().$defaultFn(() => generateTodayDateFormatted()),
});

export const notesRelations = relations(notes, ({ one }) => ({
	user: one(users, {
		fields: [notes.userId],
		references: [users.id],
	}),
}));

export type NotesTypeS = typeof notes.$inferSelect;
export type NotesTypeI = typeof notes.$inferInsert;

export function generateTodayDateFormatted(): string {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	// today = mm + '-' + dd + '-' + yyyy;
	return [yyyy, mm, dd].join('-');
}

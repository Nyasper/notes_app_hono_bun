import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { v7 as randomUUIDv7 } from 'uuid';
import { usersTable } from './user.schema';

export const notesTable = sqliteTable('notes', {
	id: text()
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
	title: text({ length: 70 }).notNull(),
	description: text({ length: 1000 }),
	userId: text().references(() => usersTable.id),
	created: text().default(new Date().toString()),
});

export const notesRelation = relations(notesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [notesTable.userId],
		references: [usersTable.id],
	}),
}));

export type notesTypeS = typeof notesTable.$inferSelect;
export type notesTypeI = typeof notesTable.$inferInsert;

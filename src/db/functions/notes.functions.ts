import type { dbContext } from '../../middlewares/db.middleware';
import { notesTable, usersTable } from '../schemas/user.schema';
import {
	notesRelation,
	type notesTypeI,
	type notesTypeS,
} from '../schemas/notes.schema';
import { eq } from 'drizzle-orm';

export async function insertNotes({
	db,
	userId,
	note,
}: InsertNotes): Promise<notesTypeS[]> {
	return await db
		.insert(notesTable)
		.values({ ...note, userId })
		.returning();
}

export async function getNotes({
	db,
	userId,
}: GetNotes): Promise<notesTypeS[]> {
	const notes = await db
		.select()
		.from(notesTable)
		.where(eq(notesTable.userId, userId));
	return notes;
}

interface InsertNotes {
	db: dbContext;
	userId: string;
	note: notesTypeI;
}

interface GetNotes {
	db: dbContext;
	userId: string;
}

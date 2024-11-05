import type { DbContext } from '../../middlewares/db.middleware';
import { notes as notesTable } from '../schema/notes';
import { type NotesTypeS } from '../schema/notes';
import { eq } from 'drizzle-orm';
import type { NoteCreateDTO } from '../../DTO/notes/create.DTO';
import type { CommonResponse } from './common.types';

export async function insertNote({
	db,
	userId,
	noteToInsert,
}: InsertNote): Promise<CreateNoteStatus> {
	try {
		const note = (
			await db
				.insert(notesTable)
				.values({ ...noteToInsert, userId })
				.returning()
		)[0];

		return {
			success: true,
			message: 'Note created successfully',
			statusCode: 201,
			note,
		};
	} catch (error) {
		const message = 'Error trying to insert note';
		console.error(message, error);
		return {
			success: false,
			message,
			statusCode: 500,
			note: null,
		};
	}
}

export async function getNotesFromUser({
	db,
	userId,
}: GetNotes): Promise<GetNotesStatus> {
	try {
		const notes = await db
			.select()
			.from(notesTable)
			.where(eq(notesTable.userId, userId));

		if (notes.length === 0)
			return {
				success: false,
				message: 'No notes found',
				statusCode: 404,
				notes: [],
			};

		return {
			success: true,
			message: `${notes.length} notes from user ${notes[0].userId}`,
			statusCode: 200,
			notes,
		};
	} catch (error) {
		const message = 'Error trying to get notes';
		console.error(message, error);
		return { success: false, message, statusCode: 500, notes: [] };
	}
}

interface InsertNote {
	db: DbContext;
	userId: string;
	noteToInsert: NoteCreateDTO;
}

interface GetNotes {
	db: DbContext;
	userId: string;
}

interface CreateNoteStatus extends CommonResponse {
	note: NotesTypeS | null;
}

interface GetNotesStatus extends CommonResponse {
	notes: NotesTypeS[];
}

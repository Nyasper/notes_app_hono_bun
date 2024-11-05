import type { DbContext } from '../../middlewares/db.middleware';
import { notes as notesTable } from '../schema/notes';
import { type NotesTypeS } from '../schema/notes';
import { eq } from 'drizzle-orm';
import type { NoteCreateDTO } from '../../DTO/notes/create.DTO';
import type { ResponseWithData, ResponseWithMessage } from './responses.types';
import { NoteUpdateDTO } from '../../DTO/notes/update.DTO';

export async function insertNote({
	db,
	userId,
	noteToInsert,
}: InsertNote): Promise<ResponseWithData<NotesTypeS>> {
	try {
		const [noteInserted] = await db
			.insert(notesTable)
			.values({ ...noteToInsert, userId })
			.returning();

		return {
			success: true,
			message: 'Note created successfully',
			statusCode: 201,
			data: noteInserted,
		};
	} catch (error) {
		const message = 'Error trying to insert note';
		console.error(message, error);
		return {
			success: false,
			message,
			statusCode: 500,
		};
	}
}

export async function getNotesFromUser({
	db,
	userId,
}: GetNotes): Promise<ResponseWithData<NotesTypeS[]>> {
	try {
		const notes = await db
			.select()
			.from(notesTable)
			.where(eq(notesTable.userId, userId));

		return {
			success: true,
			message: `${notes.length}  note(s) found`,
			statusCode: 200,
			data: notes,
		};
	} catch (error) {
		const message = 'Error trying to get notes';
		console.error(message, error);
		return { success: false, message, statusCode: 500, data: [] };
	}
}

export async function getNote({
	db,
	id,
}: GetNote): Promise<ResponseWithData<NotesTypeS>> {
	try {
		const [note] = await db
			.select()
			.from(notesTable)
			.where(eq(notesTable.id, id));

		if (!note)
			return { success: false, message: "Note doesn't exist", statusCode: 404 };

		return {
			success: true,
			message: 'Note found',
			statusCode: 200,
			data: note,
		};
	} catch (error) {
		const message = 'Error trying to get notes';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

export async function updateNote({
	db,
	id,
	note,
}: UpdateNote): Promise<ResponseWithData<NotesTypeS>> {
	try {
		const [updatedNote] = await db
			.update(notesTable)
			.set(note)
			.where(eq(notesTable.id, id))
			.returning();

		if (!updatedNote)
			return {
				success: false,
				message: "Note doesn't exist",
				statusCode: 404,
			};

		return {
			success: true,
			data: updatedNote,
			message: 'Note updated successfully',
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to update note';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

export async function deleteNote({
	db,
	id,
}: DeleteNote): Promise<ResponseWithMessage> {
	try {
		const [deletedNote] = await db
			.delete(notesTable)
			.where(eq(notesTable.id, id))
			.returning();

		if (!deletedNote)
			return { success: false, message: "Note doesn't exist", statusCode: 404 };

		return {
			success: true,
			message: 'Note deleted successfully',
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to delete note';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

export async function deleteAllNotes({
	db,
	userId,
}: DeleteAllNotes): Promise<ResponseWithMessage> {
	try {
		await db.delete(notesTable).where(eq(notesTable.userId, userId));

		return {
			success: true,
			message: 'Notes deleted successfully',
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to delete notes';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

interface InsertNote {
	db: DbContext;
	userId: string;
	noteToInsert: NoteCreateDTO;
}

interface GetNote {
	db: DbContext;
	id: string;
}

interface GetNotes {
	db: DbContext;
	userId: string;
}

interface UpdateNote {
	db: DbContext;
	id: string;
	note: NoteUpdateDTO;
}

interface DeleteNote {
	db: DbContext;
	id: string;
}

interface DeleteAllNotes {
	db: DbContext;
	userId: string;
}

import { Hono } from 'hono';
import { useDB } from '../../middlewares/db.middleware';
import { insertNote } from '../../db/functions/notes.functions';

export const adminNotesRouter = new Hono()
	.post('/', useDB, async ({ var: { db }, text, json, req }) => {
		try {
			const { userId, ...note } = await req.json();
			const noteCreated = await insertNote({ db, userId, note });
			if (!note.title || !note.description || false)
				return text('Title or description not provided.', 400);
			// true = req.user.id

			return json(noteCreated, 201);
		} catch (error) {
			console.error(error);
			return text('Internal Server Error', 500);
		}
	})
	.get('/', (c) => c.text('notes admin here'));

import { Hono } from 'hono';
import {
	deleteAllNotes,
	deleteNote,
	getNote,
	getNotesFromUser,
	insertNote,
	updateNote,
} from '../db/functions/notes.functions';
import { noteCreateDTO, type NoteCreateDTO } from '../DTO/notes/create.DTO';
import { useDB } from '../middlewares/db.middleware';
import { zValidator } from '@hono/zod-validator';
import { requireAuth } from '../middlewares/auth.middleware';
import { NoteUpdateDTO, noteUpdateDTO } from '../DTO/notes/update.DTO';

export const notesRouter = new Hono()
	.use('/*', requireAuth)
	.post(
		'/',
		zValidator('json', noteCreateDTO),
		useDB,
		async ({ var: { db, userPayload }, req, json }) => {
			const noteToInsert: NoteCreateDTO = await req.json();
			const noteCreated = await insertNote({
				db,
				userId: userPayload.id,
				noteToInsert,
			});

			return json(noteCreated, 201);
		}
	)
	.get('/all', useDB, async ({ var: { db, userPayload }, json }) => {
		const { statusCode, ...response } = await getNotesFromUser({
			db,
			userId: userPayload.id,
		});

		return json(response, statusCode);
	})
	.get('/:id', useDB, async ({ req, var: { db }, json }) => {
		const { id } = req.param();
		const { statusCode, ...response } = await getNote({ db, id });

		return json(response, statusCode);
	})
	.put(
		'/:id',
		zValidator('json', noteUpdateDTO),
		useDB,
		async ({ req, var: { db }, json }) => {
			const { id } = req.param();
			const note: NoteUpdateDTO = await req.json();
			const { statusCode, ...response } = await updateNote({ db, id, note });

			return json(response, statusCode);
		}
	)
	.delete('/all', useDB, async ({ var: { db, userPayload }, json }) => {
		const userId = userPayload.id;
		const { statusCode, ...response } = await deleteAllNotes({ db, userId });

		return json(response, statusCode);
	})
	.delete('/:id', useDB, async ({ req, var: { db }, json }) => {
		const { id } = req.param();
		const { statusCode, ...response } = await deleteNote({ db, id });

		return json(response, statusCode);
	});

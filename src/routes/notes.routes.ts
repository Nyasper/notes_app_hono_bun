import { Hono } from 'hono';
import { getNotesFromUser, insertNote } from '../db/functions/notes.functions';
import { noteCreateDTO, type NoteCreateDTO } from '../DTO/notes/create.DTO';
import { useDB } from '../middlewares/db.middleware';
import { zValidator } from '@hono/zod-validator';
import { requireAuth } from '../middlewares/auth.middleware';

const user1 = '0192f982-3e36-7000-878d-7c0c9870ef29';
const user2 = '0192f982-45b4-7000-9a11-36df24799bbe';

export const notesRouter = new Hono()
	.use('/*', requireAuth)
	.post(
		'/',
		useDB,
		zValidator('json', noteCreateDTO),
		async ({ var: { db }, req, json }) => {
			const noteToInsert: NoteCreateDTO = await req.json();
			const noteCreated = await insertNote({ db, userId: user2, noteToInsert });

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
	.get('/:id', async (c) => {
		try {
			const { id } = await c.req.json();
			if (!id) return c.json('Task ID not provided', 400);
			const task = 'await TaskService.getOneTaskById(id)';
			return c.json(task, 200);
		} catch (error) {
			console.error(error);
			return c.json('Internal Server Error', 500);
		}
	})
	.put('/:id', async (c) => {
		try {
			const { id } = c.req.param();
			const taskToUpdate = await c.req.json();
			if (!id || !taskToUpdate)
				return c.json('Task ID and data are required', 400);

			const updatedTask = 'await TaskService.updateTask(taskToUpdate)';

			if (!updatedTask) return c.notFound();
			return c.json(updatedTask, 200);
		} catch (error) {
			console.error(error);
			return c.json('Internal Server Error', 500);
		}
	})
	.delete('/:id', async (c) => {
		try {
			const { id } = c.req.param();
			if (!id) return c.json('Task ID and data are required', 400);

			const deletedTask = 'await TaskService.deleteTaskById(taskId)';
			if (!deletedTask) return c.notFound();

			return c.json(deletedTask, 200);
		} catch (error) {
			console.error(error);
			return c.json('Internal Server Error', 500);
		}
	});

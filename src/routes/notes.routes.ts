import { Hono } from 'hono';
import { getNotesFromUser, insertNote } from '../db/functions/notes.functions';
import { noteCreateDTO, type NoteCreateDTO } from '../DTO/notes/create.DTO';
import { useDB } from '../middlewares/db.middleware';
import { zValidator } from '@hono/zod-validator';

export const notesRouter = new Hono()
	.post(
		'/',
		useDB,
		zValidator('json', noteCreateDTO),
		async ({ var: { db }, req, json }) => {
			const user1 = '0192f869-1e2d-7000-833c-2577f2492bba';
			const user2 = '0192f869-2aba-7000-96fe-1a804128c0b2';

			const noteToInsert: NoteCreateDTO = await req.json();
			const noteCreated = await insertNote({ db, userId: user2, noteToInsert });

			return json(noteCreated, 201);
		}
	)
	.get('/all', useDB, async ({ var: { db }, json }) => {
		const user1 = '0192f869-1e2d-7000-833c-2577f2492bba';
		const user2 = '0192f869-2aba-7000-96fe-1a804128c0b2';
		const { statusCode, ...response } = await getNotesFromUser({
			db,
			userId: user2,
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

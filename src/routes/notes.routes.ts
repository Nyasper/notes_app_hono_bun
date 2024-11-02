import { Hono } from 'hono';
import { getNotes } from '../db/functions/notes.functions';

export const notesRouter = new Hono()
	.post('/', async (c) => {
		try {
			const note = await c.req.json();

			if (!note.title || !note.description || false)
				return c.text('Title or description not provided.', 400);
			// true = req.user.id
			const noteCreated = 'await noteService.createnote(req.user.id, note);';

			return c.json(noteCreated, 201);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	})
	.get('/all', async (c) => {
		try {
			const tasks = 'await TaskService.getAllUserTasks(req.user?.id as string)';

			if (!tasks) return c.text('Task not provided', 400);

			return c.json(tasks, 200);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	})
	.get('/:id', async (c) => {
		try {
			const { id } = await c.req.json();
			if (!id) return c.text('Task ID not provided', 400);
			const task = 'await TaskService.getOneTaskById(id)';
			return c.json(task, 200);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	})
	.put('/:id', async (c) => {
		try {
			const { id } = c.req.param();
			const taskToUpdate = await c.req.json();
			if (!id || !taskToUpdate)
				return c.text('Task ID and data are required', 400);

			const updatedTask = 'await TaskService.updateTask(taskToUpdate)';

			if (!updatedTask) return c.notFound();
			return c.json(updatedTask, 200);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	})
	.delete('/:id', async (c) => {
		try {
			const { id } = c.req.param();
			if (!id) return c.text('Task ID and data are required', 400);

			const deletedTask = 'await TaskService.deleteTaskById(taskId)';
			if (!deletedTask) return c.notFound();

			return c.json(deletedTask, 200);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	});

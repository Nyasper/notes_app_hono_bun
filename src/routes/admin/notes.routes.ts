import { Hono } from 'hono';

export const adminNotesRouter = new Hono().get('/', (c) => {
	return c.text('Admin notes');
});

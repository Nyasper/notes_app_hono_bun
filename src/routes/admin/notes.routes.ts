import { Hono } from 'hono';

export const adminNotesRouter = new Hono().get('/', (c) =>
	c.text('notes admin here')
);

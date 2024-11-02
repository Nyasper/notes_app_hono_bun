import { Hono } from 'hono';
import { usersRouter } from './users.routes';
import { notesRouter } from './notes.routes';
import { adminRouter } from './admin/router';

export const router = new Hono()
	.get('/', (c) => c.text('hello hono notes API!'))
	.route('/users', usersRouter)
	.route('/notes', notesRouter)
	.route('/admin', adminRouter);

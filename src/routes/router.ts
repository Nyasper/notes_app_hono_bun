import { Hono } from 'hono';
import { authRouter } from './auth.routes';
import { notesRouter } from './notes.routes';
import { adminRouter } from './admin/router';

export const router = new Hono()
	.get('/', (c) => c.text('hello hono notes API!'))
	.route('/auth', authRouter)
	.route('/notes', notesRouter)
	.route('/admin', adminRouter);

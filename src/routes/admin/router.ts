import { Hono } from 'hono';
import { adminUsersRouter } from './users.routes';
import { adminNotesRouter } from './notes.routes';

export const adminRouter = new Hono()
	.route('/users', adminUsersRouter)
	.route('/notes', adminNotesRouter);

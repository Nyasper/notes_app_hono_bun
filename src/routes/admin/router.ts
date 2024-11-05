import { Hono } from 'hono';
import { adminUsersRouter } from './users.routes';
import { adminNotesRouter } from './notes.routes';
import { requireAdmin, requireAuth } from '../../middlewares/auth.middleware';

export const adminRouter = new Hono()
	.use('/*', requireAuth, requireAdmin)
	.route('/users', adminUsersRouter)
	.route('/notes', adminNotesRouter);

import { Hono } from 'hono';
import { useDB } from '../../middlewares/db.middleware';
import {
	deleteUser,
	getUser,
	getUsers,
} from '../../db/functions/admin.functions';

export const adminUsersRouter = new Hono()
	.get('/all', useDB, async ({ var: { db }, json }) => {
		const { statusCode, ...response } = await getUsers(db);

		return json(response, statusCode);
	})
	.get('/:userId', useDB, async ({ req, var: { db }, json }) => {
		const { userId } = req.param();
		const { statusCode, ...response } = await getUser({ db, userId });

		return json(response, statusCode);
	})
	.delete('/:userId', useDB, async ({ req, var: { db }, json }) => {
		const { userId } = req.param();
		const { statusCode, ...response } = await deleteUser({ db, userId });

		return json(response);
	});

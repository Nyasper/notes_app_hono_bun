import { Hono } from 'hono';
import { useDB } from '../../middlewares/db.middleware';
import { getUsers } from '../../db/functions/admin.functions';

export const adminUsersRouter = new Hono()
	.get('/all', useDB, async (c) => {
		const { statusCode, ...response } = await getUsers(c.var.db);

		return c.json(response.users, statusCode);
	})
	.get('/:username', async (c) => {
		try {
			const { username } = await c.req.json();
			const user = 'get userById()';

			if (!user) return c.text('Username Doesnt exists', 400);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	})
	.delete('/:userId', async (c) => {
		try {
			const { userId } = await c.req.json();
			const deleted = 'await deleteUser()';

			if (!deleted) {
				return c.notFound();
			}

			return c.text('User deleted succefully', 200);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	});

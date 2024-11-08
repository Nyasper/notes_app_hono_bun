import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { UserLoginDTO, userLoginDTO } from '../DTO/user/login.DTO';
import {
	userRegisterDTO,
	type UserRegisterDTO,
} from '../DTO/user/register.DTO';
import { loginUser, registerUser } from '../db/functions/users.function';
import { useDB } from '../middlewares/db.middleware';
import { setCookie, deleteCookie } from 'hono/cookie';
import { requireAuth } from '../middlewares/auth.middleware';

export const authRouter = new Hono()
	.post(
		'/register',
		zValidator('json', userRegisterDTO),
		useDB,

		async ({ var: { db }, req, json }) => {
			const user: UserRegisterDTO = await req.json();

			const { statusCode, ...response } = await registerUser({ db, user });
			return json(response, statusCode);
		}
	)
	.post('/login', zValidator('json', userLoginDTO), useDB, async (c) => {
		const user: UserLoginDTO = await c.req.json();
		c.env.JWT_SECRET = process.env.JWT_SECRET;
		const db = c.var.db;

		const tokenSecret = c.env.JWT_SECRET;
		const { statusCode, token, ...response } = await loginUser({
			db,
			user,
			tokenSecret,
		});
		setCookie(c, 'token', token!, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return c.json({ response }, statusCode);
	})
	.get('/info', requireAuth, async ({ var: { userPayload }, json }) => {
		return json(
			{ success: true, message: 'user info provided', data: userPayload },
			200
		);
	})
	.post('/logout', async (c) => {
		deleteCookie(c, 'token');
		return c.json({ sucess: true, message: 'user logout succesfully' }, 200);
	});

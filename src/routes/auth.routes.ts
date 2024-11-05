import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { UserLoginDTO, userLoginDTO } from '../DTO/user/login.DTO';
import {
	userRegisterDTO,
	type UserRegisterDTO,
} from '../DTO/user/register.DTO';
import { loginUser, registerUser } from '../db/functions/users.function';
import { useDB } from '../middlewares/db.middleware';
import { setCookie } from 'hono/cookie';

export const authRouter = new Hono()
	.post(
		'/register',
		useDB,
		zValidator('json', userRegisterDTO),

		async ({ var: { db }, req, json }) => {
			const user: UserRegisterDTO = await req.json();

			const { message, statusCode } = await registerUser(db, user);
			return json({ message }, statusCode);
		}
	)
	.post(
		'/login',
		useDB,
		zValidator('json', userLoginDTO),

		async (c) => {
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
		}
	)
	.get('/logout', (c) => {
		return c.text('logout');
	})
	.get('refresh', (c) => {
		return c.text('refresh');
	});

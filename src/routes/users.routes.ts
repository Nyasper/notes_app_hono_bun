import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { UserLoginDTO, userLoginDTO } from '../DTO/user/login.DTO';
import {
	userRegisterDTO,
	type UserRegisterDTO,
} from '../DTO/user/register.DTO';
import { loginUser, registerUser } from '../db/functions/users.function';
import { useDB } from '../middlewares/db.middleware';

export const usersRouter = new Hono()
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
		async ({ var: { db }, req, json }) => {
			const user: UserLoginDTO = await req.json();
			const { message, statusCode } = await loginUser(db, user);

			return json({ message }, statusCode);
		}
	);

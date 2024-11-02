import { Hono } from 'hono';

export const usersRouter = new Hono()
	.post('/register', async (c) => {
		const { email, password } = await c.req.json();

		if (!email || !password) {
			return c.text('email or password not provided', 400);
		}

		const existUser = !true;

		if (existUser)
			return c.text('Ya existe un usuario con estas credenciales', 409);

		const registerUser = true;

		return c.text('Usuario registrado exitosamente.', 201);
	})

	.post('/login', async (c) => {
		try {
			let { username, password } = await c.req.json();

			if (!username || !password)
				return c.text('username or password not provided.', 400);

			const user = 'validate user';

			if (!user) return c.text('Invalid Credentials', 400);

			const token = { id: 'uno ahi', username };

			return c.json({ token }, 200);
		} catch (error) {
			console.error(error);
			return c.text('Internal Server Error', 500);
		}
	});

import { createMiddleware } from 'hono/factory';
import { verify as JwtVerify } from 'hono/jwt';
import { JwtCustomPayload } from '../db/functions/users.function';
import { getCookie } from 'hono/cookie';

export const requireAuth = createMiddleware<JwtContext>(async (c, next) => {
	c.env.JWT_SECRET = process.env.JWT_SECRET;

	// const token = c.req.header('Authorization');
	const token = getCookie(c, 'token');
	console.log({ tokenCookie: token });
	if (!token) {
		return c.json('No token provided', 401);
	}

	try {
		const payload = (await JwtVerify(
			token,
			c.env.JWT_SECRET
		)) as JwtCustomPayload;

		c.set('userPayload', payload);
		return await next();
	} catch (error) {
		console.error('Token verification failed:', error);
		return c.json({ success: false, message: 'Invalid token' }, 401);
	}
});

interface JwtContext {
	Variables: {
		userPayload: JwtCustomPayload;
	};
	Bindings: {
		JWT_SECRET: string;
	};
}

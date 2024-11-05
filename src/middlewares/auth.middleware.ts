import { createMiddleware } from 'hono/factory';
import { verify as JwtVerify } from 'hono/jwt';
import { JwtCustomPayload } from '../db/functions/users.function';
import { getCookie } from 'hono/cookie';

export const requireAuth = createMiddleware<JwtContext>(async (c, next) => {
	c.env.JWT_SECRET = process.env.JWT_SECRET;

	if (!c.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is not defined in environment variables');
	}

	const token = getCookie(c, 'token');
	if (!token) {
		return c.json({ success: false, message: 'No token provided' }, 401);
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

export const requireAdmin = createMiddleware<JwtContext>(async (c, next) => {
	c.env.JWT_SECRET = process.env.JWT_SECRET;

	// const token = c.req.header('Authorization');
	const token = getCookie(c, 'token');

	if (!token) {
		return c.json({ success: false, message: 'No token provided' }, 401);
	}

	try {
		const payload = (await JwtVerify(
			token,
			c.env.JWT_SECRET
		)) as JwtCustomPayload;

		if (payload.admin !== true)
			return c.json({ success: false, message: 'Not Authorized' }, 403);

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

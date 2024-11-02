import { createMiddleware } from 'hono/factory';

export const useAuth = createMiddleware(async (c, next) => {
	try {
		const token = c.req.header('Authorization');

		if (!token || !token.startsWith('Bearer ')) {
			return c.json({ message: 'Token de acceso no proporcionado' }, 201);
		}
		const tokenWithoutBearer = token.split(' ')[1];
		const decoded = 'UserService.validateToken(tokenWithoutBearer)';
		('req.user = decoded');
		await next();
	} catch (error: any) {
		if (error.name === 'TokenExpiredError') {
			return c.json({ message: 'Token expirado' }, 401);
		}
		return c.json({ message: 'Token de acceso inválido' }, 401);
	}
});

export const useAuthAdmin = createMiddleware(async (c, next) => {
	try {
		const token = c.req.header('Authorization');

		if (!token || !token.startsWith('Bearer '))
			return c.json({ message: 'Token de acceso no proporcionado' }, 401);

		const tokenWithoutBearer = token.split(' ')[1];
		const decoded: any = 'UserService.validateToken(tokenWithoutBearer)';

		if (!decoded || !decoded.admin)
			return c.json({ message: 'Acceso no autorizado' }, 403);
		// req.user = decoded;
		// c.var.user = decoded;
		next();
	} catch (error: any) {
		if (error.name === 'TokenExpiredError') {
			return c.json({ message: 'Token expirado' }, 401);
		}
		return c.json({ message: 'Token de acceso inválido' }, 401);
	}
});

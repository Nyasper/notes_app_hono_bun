import { createMiddleware } from 'hono/factory';

// Middleware para verificar si el usuario está logeado
export const requireAuth = createMiddleware(async (c, next) => {
	let req = {
		user: true,
	};

	if (!req.user)
		return c.json(
			{ message: 'Acceso no autorizado. Necesitas iniciado sesion.' },
			403
		);

	return await next();
});

// Middleware para verificar si el usuario está logeado
export const isNotLogged = createMiddleware(async (c, next) => {
	let req = {
		user: true,
	};

	if (!req.user) return await next();

	return c.json(
		{ message: 'Acceso no autorizado. Ya has iniciado sesion' },
		403
	);
});

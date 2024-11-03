import { z } from 'zod';

export const userRegisterDTO = z.object({
	email: z.string().email(),
	password: z.string().length(8),
});

export type UserRegisterDTO = z.infer<typeof userRegisterDTO>;

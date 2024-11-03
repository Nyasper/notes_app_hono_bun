import { z } from 'zod';

export const userLoginDTO = z.object({
	username: z.string().length(4),
	password: z.string().length(8),
});

export type UserLoginDTO = z.infer<typeof userLoginDTO>;

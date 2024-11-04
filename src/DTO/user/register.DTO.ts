import { z } from 'zod';
import { userDTOConsts } from './validationConstants';
const { username, password } = userDTOConsts;

export const userRegisterDTO = z.object({
	username: z.string().min(username.min).max(username.max),
	password: z.string().min(password.min).max(password.max),
});

export type UserRegisterDTO = z.infer<typeof userRegisterDTO>;

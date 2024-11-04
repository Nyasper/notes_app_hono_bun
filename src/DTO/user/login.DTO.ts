import { z } from 'zod';
import { userDTOConsts } from './validationConstants';

const { username, password } = userDTOConsts;

export const userLoginDTO = z.object({
	username: z.string().min(username.min).max(username.max),
	password: z.string().min(password.min).max(password.max),
});

export type UserLoginDTO = z.infer<typeof userLoginDTO>;

import { usersTable, type userTypeS } from '../schemas/user.schema';
import type { DbContext } from '../../middlewares/db.middleware';
import { UserRegisterDTO } from '../../DTO/user/register.DTO';
import { eq } from 'drizzle-orm';
import { UserLoginDTO } from '../../DTO/user/login.DTO';
import { password } from 'bun';
import type { CommonResponse } from './common.types';

export async function registerUser(
	db: DbContext,
	user: UserRegisterDTO
): Promise<CommonResponse> {
	try {
		const existingUser = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, user.username));

		if (existingUser.length > 0)
			return {
				success: false,
				message: 'User alredy exists.',
				statusCode: 409,
			};

		user.password = await password.hash(user.password, 'bcrypt');
		await db.insert(usersTable).values(user);
		return {
			success: true,
			message: 'User registered successfully.',
			statusCode: 201,
		};
	} catch (error) {
		const message = 'Error on regiter user';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

export async function loginUser(
	db: DbContext,
	user: UserLoginDTO
): Promise<CommonResponse> {
	try {
		const existingUser = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, user.username));

		if (existingUser.length === 0) {
			return { success: false, message: 'User not found.', statusCode: 404 };
		}

		const isPasswordValid: boolean = await password.verify(
			user.password,
			existingUser[0].password,
			'bcrypt'
		);

		if (!isPasswordValid) {
			return {
				success: false,
				message: 'Incorrect password.',
				statusCode: 401,
			};
		}

		return {
			success: true,
			message: 'User logged successfully.',
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on login user.';
		console.error(message, error);
		return {
			success: false,
			message,
			statusCode: 500,
		};
	}
}

export async function getUser({ db, userId }: GetUser): Promise<userTypeS[]> {
	const user = await db.select().from(usersTable);
	return user;
}

interface GetUser {
	db: DbContext;
	userId: string;
}

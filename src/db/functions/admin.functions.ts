import { eq } from 'drizzle-orm';
import type { DbContext } from '../../middlewares/db.middleware';
import { UserTypeS } from '../schema/user';
import type { ResponseWithData, ResponseWithMessage } from './responses.types';
import { users as usersTable } from '../schema/user';

export async function getUsers(
	db: DbContext
): Promise<ResponseWithData<UserTypeS[]>> {
	try {
		const users = await db.query.users.findMany({
			with: {
				notes: true,
			},
		});

		return {
			success: true,
			data: users,
			message: `returning ${users.length} users`,
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to obtain all users.';
		console.error(message, error);
		return {
			success: false,
			data: [],
			message,
			statusCode: 500,
		};
	}
}

export async function getUser({
	db,
	userId,
}: GetUser): Promise<ResponseWithData<UserTypeS>> {
	try {
		const user = await db.query.users.findFirst({
			with: {
				notes: true,
			},
		});

		if (!user)
			return { success: false, message: "User doesn't exist", statusCode: 404 };

		return {
			success: true,
			message: 'User found',
			data: user,
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to get an user';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

export async function deleteUser({
	db,
	userId,
}: DeleteUser): Promise<ResponseWithMessage> {
	try {
		await db.delete(usersTable).where(eq(usersTable.id, userId)).limit(1);
		return {
			success: true,
			message: 'User deleted successfully',
			statusCode: 204,
		};
	} catch (error) {
		const message = 'Error trying to delete user';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

interface GetUser {
	db: DbContext;
	userId: string;
}

interface DeleteUser {
	db: DbContext;
	userId: string;
}

import type { DbContext } from '../../middlewares/db.middleware';
import { usersTable } from '../schemas/user.schema';
import type { CommonResponse } from './common.types';

export async function getUsers(db: DbContext): Promise<CommonResponse> {
	try {
		const users = await db.select().from(usersTable);
		return {
			success: true,
			message: `returning ${users.length} users`,
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to obtain all users.';
		console.error(message, error);
		return {
			success: false,
			message,
			statusCode: 500,
		};
	}
}

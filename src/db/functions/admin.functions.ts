import type { DbContext } from '../../middlewares/db.middleware';
import type { CommonResponse } from './common.types';

export async function getUsers(db: DbContext): Promise<GetUsersResponse> {
	try {
		const users = await db.query.users.findMany({
			with: {
				notes: true,
			},
		});

		return {
			success: true,
			users,
			message: `returning ${users.length} users`,
			statusCode: 200,
		};
	} catch (error) {
		const message = 'Error on trying to obtain all users.';
		console.error(message, error);
		return {
			success: false,
			users: [],
			message,
			statusCode: 500,
		};
	}
}

interface GetUsersResponse extends CommonResponse {
	users: any[];
}

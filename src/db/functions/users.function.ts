import {
	usersTable,
	type userTypeI,
	type userTypeS,
} from '../schemas/user.schema';
import type { DbContext } from '../../middlewares/db.middleware';

export async function createUser(
	db: DbContext,
	user: userTypeI
): Promise<userTypeI[]> {
	return await db.insert(usersTable).values(user).returning();
}

export async function getUser({ db, userId }: GetUser): Promise<userTypeS[]> {
	const user = await db.select().from(usersTable);
	return user;
}

interface GetUser {
	db: DbContext;
	userId: string;
}

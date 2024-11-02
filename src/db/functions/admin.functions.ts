import type { DbContext } from '../../middlewares/db.middleware';
import { usersTable, type userTypeS } from '../schemas/user.schema';

export async function getUsers(db: DbContext): Promise<userTypeS[]> {
	return await db.select().from(usersTable);
}

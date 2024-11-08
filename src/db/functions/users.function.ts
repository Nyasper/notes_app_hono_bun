import { users as usersTable, type UserTypeS } from '../schema/user';
import type { DbContext } from '../../middlewares/db.middleware';
import { UserRegisterDTO } from '../../DTO/user/register.DTO';
import { eq } from 'drizzle-orm';
import { UserLoginDTO } from '../../DTO/user/login.DTO';
import { password } from 'bun';
import type { ResponseWithMessage } from './responses.types';
import { sign as JwtSign } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';

export async function registerUser({
	db,
	user,
}: RegisterUser): Promise<ResponseWithMessage> {
	try {
		const [existingUser] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, user.username));

		if (existingUser)
			return {
				success: false,
				message: 'User alredy exists',
				statusCode: 409,
			};

		user.password = await password.hash(user.password, 'bcrypt');
		await db.insert(usersTable).values(user);
		return {
			success: true,
			message: 'User registered successfully',
			statusCode: 201,
		};
	} catch (error) {
		const message = 'Error on regiter user';
		console.error(message, error);
		return { success: false, message, statusCode: 500 };
	}
}

export async function loginUser({
	db,
	user,
	tokenSecret,
}: LoginUser): Promise<LoginResponse> {
	try {
		const [existingUser] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, user.username));

		if (!existingUser) {
			return {
				success: false,
				message: 'User not found',
				statusCode: 404,
				token: null,
			};
		}

		const isPasswordValid: boolean = await password.verify(
			user.password,
			existingUser.password,
			'bcrypt'
		);

		if (!isPasswordValid) {
			return {
				success: false,
				message: 'Incorrect password',
				statusCode: 401,
				token: null,
			};
		}

		const token = await generateToken(existingUser, tokenSecret);

		return {
			success: true,
			message: 'User logged successfully',
			statusCode: 200,
			token,
		};
	} catch (error) {
		const message = 'Error on login user';
		console.error(message, error);
		return {
			success: false,
			message,
			statusCode: 500,
			token: null,
		};
	}
}

async function generateToken(user: UserTypeS, jwt_secret: string) {
	const payload: JwtCustomPayload = {
		id: user.id,
		username: user.username,
		admin: user.admin ?? false,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14, // expires in two weeks
	};
	return await JwtSign(payload, jwt_secret);
}

export interface JwtCustomPayload extends JWTPayload {
	id: string;
	username: string;
	admin: boolean;
	exp: number;
}

interface LoginResponse extends ResponseWithMessage {
	token: string | null;
}

interface RegisterUser {
	db: DbContext;
	user: UserRegisterDTO;
}

interface LoginUser {
	db: DbContext;
	user: UserLoginDTO;
	tokenSecret: string;
}

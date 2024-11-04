import { StatusCode } from 'hono/utils/http-status';

export interface CommonResponse {
	success: boolean;
	message: string;
	statusCode: StatusCode;
}

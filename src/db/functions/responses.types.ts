import { StatusCode } from 'hono/utils/http-status';

interface BaseResponse {
	success: boolean;
	statusCode: StatusCode;
}

export interface ResponseWithMessage extends BaseResponse {
	message: string;
}

export interface ResponseWithData<T> extends ResponseWithMessage {
	data?: T;
}

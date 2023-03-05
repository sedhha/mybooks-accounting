interface IErrorWithMessage {
	error: boolean;
	message?: string;
}

type UserType = 'Expert' | 'Customer';

export type { IErrorWithMessage, UserType };

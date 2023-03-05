interface IErrorWithMessage {
	error: boolean;
	message?: string;
}

interface IErrorWithPayload<T> {
	error: boolean;
	payload?: T;
}

type UserType = 'Expert' | 'Customer';

type TaskStatus = 'Assigned' | 'Expired' | 'Queued' | 'Completed';

export type { IErrorWithMessage, UserType, TaskStatus, IErrorWithPayload };

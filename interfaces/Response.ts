interface IResponse<T> {
	error: boolean;
	message?: string;
	status: number;
	payload?: T;
}

export type { IResponse };

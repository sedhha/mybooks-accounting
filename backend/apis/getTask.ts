import db from '@/db/index';
import { IResponse } from '@/interfaces/Response';
import { IReqBE } from '@/interfaces/Requests';

const getUserTasks = (userID: string | string[]): IResponse<IReqBE[]> => {
	if (typeof userID !== 'string')
		return { status: 422, error: true, message: 'Invalid user' };
	return { status: 200, error: false, payload: db.getTasksByUserID(userID) };
};

export default getUserTasks;

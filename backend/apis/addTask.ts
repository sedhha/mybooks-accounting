import db from '@/db/index';
import { IRequestItem } from '@/interfaces/Requests';
import * as z from 'zod';
import AvailableRequests from '@/constants/requests.json';
import { IResponse } from '@/interfaces/Response';

const validator = z.object({
	name: z.string(),
	id: z.string(),
	defaultDeadlineInDays: z.number(),
	defaultNumberInHours: z.number(),
});

const addTaskToUser = (
	userID: string | string[],
	task: IRequestItem
): IResponse<null> => {
	if (typeof userID !== 'string')
		return { status: 422, error: true, message: 'Invalid user' };
	const parsed = validator.safeParse(task);
	if (parsed.success) {
		const taskExists = AvailableRequests.find((item) => item.id === task.id);
		if (!taskExists)
			return {
				error: true,
				status: 404,
				message: 'Task user is trying to add is not available at the moment.',
			};
		const result = db.addTaskByUser(userID, parsed.data);
		if (result.error)
			return {
				error: true,
				status: 422,
				message: result.message,
			};
		return { error: false, status: 201 };
	}
	return {
		error: false,
		status: 422,
		message: 'User is trying to add invalid task.',
	};
};

export default addTaskToUser;

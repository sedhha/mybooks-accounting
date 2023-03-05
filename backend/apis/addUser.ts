import db from '@/db/index';
import { IResponse } from '@/interfaces/Response';
import * as z from 'zod';

const validator = z.literal('Expert').or(z.literal('Customer'));

const addUser = (userType?: string | string[]): IResponse<{ id: string }> => {
	if (!userType || typeof userType !== 'string') {
		console.log({ userType });
		return { error: true, status: 422, message: 'Unknown User Type' };
	}
	const user = validator.safeParse(userType);

	if (!user.success)
		return { error: true, status: 422, message: 'Invalid User Type' };
	const result = db.addUser(user.data);
	if (result.error)
		return { error: true, status: 400, message: result.message };
	return { error: false, status: 201, payload: { id: result.message ?? '' } };
};

export default addUser;

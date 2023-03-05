import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import { IRequestItem } from '@/interfaces/Requests';
import addTaskToUser from '@/backend/apis/addTask';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<null>>
) => {
	const userID = req.headers['x-user-id'] ?? '';
	const task = req.body as IRequestItem;
	const result = addTaskToUser(userID, task);
	return res.status(result.status).json(result);
};
export default handler;

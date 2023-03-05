import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import { IReqBE } from '@/interfaces/Requests';
import getUserTasks from '@/backend/apis/getTask';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<IReqBE[]>>
) => {
	const userID = req.headers['x-user-id'] ?? '';
	const result = getUserTasks(userID);
	console.log({ result });
	return res.status(result.status).json(result);
};
export default handler;

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import { IReqBE } from '@/interfaces/Requests';
import db from '@/db/index';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<IReqBE[]>>
) => {
	const { isQueued } = req.query;
	const queued = typeof isQueued !== 'string' ? false : JSON.parse(isQueued);
	return res.status(200).json({
		status: 200,
		error: false,
		payload: db.getAllRequests(queued),
	});
};
export default handler;

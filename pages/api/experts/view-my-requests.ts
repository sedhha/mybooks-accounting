import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import { IReqBE } from '@/interfaces/Requests';
import db from '@/db/index';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<IReqBE[]>>
) => {
	const expertID = req.headers['x-user-id'];
	if (typeof expertID !== 'string')
		return res.status(422).json({
			status: 422,
			error: true,
			message: 'Invalid Expert ID',
		});
	return res.status(200).json({
		status: 200,
		error: false,
		payload: db.getRequestsByExpertID(expertID),
	});
};
export default handler;

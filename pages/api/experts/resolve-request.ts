import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import db from '@/db/index';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<null>>
) => {
	const expertID = req.headers['x-user-id'];
	const { taskID } = req.query;
	if (typeof expertID !== 'string' || typeof taskID !== 'string')
		return res.status(422).json({
			status: 422,
			error: true,
			message: 'Invalid Expert ID',
		});
	db.resolveRequest(taskID, expertID);
	return res.status(200).json({
		status: 200,
		error: false,
	});
};
export default handler;

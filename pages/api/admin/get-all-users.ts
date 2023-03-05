import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import withAdminProtect from '@/backend/middleware/withAdminProtect';
import db from '@/db/index';

const handler: NextApiHandler = (
	_: NextApiRequest,
	res: NextApiResponse<IResponse<Record<string, string>>>
) => {
	return res
		.status(200)
		.json({ error: false, status: 201, payload: db.getAllUsers() });
};
export default withAdminProtect(handler);

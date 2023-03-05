import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import withAdminProtect from '@/backend/middleware/withAdminProtect';
import addUser from '@/backend/apis/addUser';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{ id: string }>>
) => {
	const { userType } = req.query;
	const result = addUser(userType);
	return res.status(result.status).json(result);
};
export default withAdminProtect(handler);

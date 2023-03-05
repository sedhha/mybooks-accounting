import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import db from '@/db/index';
import { UserType } from '@/interfaces/Process';

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<null>>
) => {
	const { loginID, userType } = req.query;
	if (typeof loginID !== 'string' || typeof userType !== 'string')
		return res.status(401).end();
	const success = db.loginUser(userType as UserType, loginID);
	return res.status(success ? 200 : 401).end();
};
export default handler;

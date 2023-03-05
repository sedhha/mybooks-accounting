import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const withAdminProtect = (handler: NextApiHandler) => {
	return (req: NextApiRequest, res: NextApiResponse) => {
		const adminID = req.headers.authorization ?? '';
		if (adminID !== process.env.ADMIN_ID) return res.status(401).end();
		return handler(req, res);
	};
};
export default withAdminProtect;

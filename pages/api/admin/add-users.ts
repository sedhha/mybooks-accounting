import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/Response';
import withAdminProtect from '@/backend/middleware/withAdminProtect';
import db from '@/db/index';
import * as z from 'zod';
import { IErrorWithMessage, UserType } from '@/interfaces/Process';

const validator = z.array(z.literal('Expert').or(z.literal('Customer')));

const handler: NextApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<IErrorWithMessage[]>>
) => {
	const { userType } = req.query;
	const parsedContent = validator.safeParse(userType);
	if (
		typeof userType === 'undefined' ||
		typeof userType === 'string' ||
		!parsedContent.success
	)
		return res.status(422).end();
	const result = db.addUserInBatch(parsedContent.data as UserType[]);
	return res.status(201).json({ error: false, status: 201, payload: result });
};
export default withAdminProtect(handler);

import { INavBar } from '@/interfaces/frontend';
import classes from './Customer.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';

const navItems: INavBar[] = [
	{
		value: 'View Request',
		path: 'view',
	},
	{
		value: 'Raise Request',
		path: 'raise',
	},
];
const activeValue = 'View Request';
const ViewRequest = () => {
	const router = useRouter();
	const { customerID } = router.query;
	const onClickHandler = (path: string) => {
		if (!customerID || typeof customerID !== 'string') return;
		router.push(`/customer/${customerID}/${path}`);
	};
	return (
		<div className={classes.Customer}>
			<NavBar
				navItems={navItems}
				activeValue={activeValue}
				onClick={onClickHandler}
			/>
			<div>Customer: {customerID?.toString()}</div>
		</div>
	);
};

export default ViewRequest;

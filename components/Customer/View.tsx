import { INavBar } from '@/interfaces/index';
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
			<div className={classes.raise}>
				<h1 className={classes.h1}>Customer ID: {customerID?.toString()}</h1>
			</div>
		</div>
	);
};

export default ViewRequest;

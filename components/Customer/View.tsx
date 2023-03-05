import { INavBar } from '@/interfaces/frontend';
import classes from './Customer.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';
const navItems: INavBar[] = [
	{
		value: 'View Request',
		isActive: true,
		onClickHandler: (value: string) => console.log('Triggering ' + value),
	},
	{
		value: 'Raise Request',
		isActive: false,
		onClickHandler: (value: string) => console.log('Triggering ' + value),
	},
];
const ViewRequest = () => {
	const router = useRouter();
	const { customerID } = router.query;
	return (
		<div className={classes.Customer}>
			<NavBar navItems={navItems} />
			<div>Customer: {customerID?.toString()}</div>
		</div>
	);
};

export default ViewRequest;

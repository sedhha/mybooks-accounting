import { INavBar, IReqBE } from '@/interfaces/index';
import classes from './Customer.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import Head from 'next/head';

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

const requests = [
	{
		name: 'Sample Request',
		id: 'Sample-ID',
		status: 'Sample-Status',
		maxTimeAllowed: new Date().getTime(),
		assignedExpertID: 'Sample-ExpertID',
		currTaskID: 'Sample-Task-ID',
	},
];
const activeValue = 'View Request';
const ViewRequest = () => {
	const router = useRouter();
	const { customerID } = router.query;
	const [tasks, setTasks] = useState<IReqBE[]>([]);
	const onClickHandler = (path: string) => {
		if (!customerID || typeof customerID !== 'string') return;
		router.push(`/customer/${customerID}/${path}`);
	};
	const logOutHandler = () => {
		sessionStorage.removeItem('userID');
		router.push('/');
	};
	useEffect(() => {
		if (!customerID || typeof customerID !== 'string') return;
		fetch(`/api/customer/get-task`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-user-id': customerID,
			},
		}).then((res) => res.json().then((data) => setTasks([...data.payload])));
	}, [customerID]);
	return (
		<Fragment>
			<Head>
				<title>MyBooks Accounting | Customer</title>
			</Head>
			<div className={classes.Customer}>
				<NavBar
					navItems={navItems}
					activeValue={activeValue}
					onClick={onClickHandler}
				/>
				<div className={classes.raise}>
					<h1 className={classes.h1}>Customer ID: {customerID?.toString()}</h1>
					<p className={classes.logout}>
						Not {customerID?.toString()}?{' '}
						<span onClick={logOutHandler}>Logout</span>
					</p>
					<div className={classes.userRequests}>
						{tasks.map((item) => (
							<div
								className={classes.userRequestCard}
								key={item.currTaskID}
							>
								<p>
									<strong>Name:</strong> {item.name}
								</p>
								<p>
									<strong>Expert:</strong>{' '}
									{item.assignedExpertID ?? 'Not Assigned'}
								</p>
								<p>
									<strong>Status:</strong> {item.status}
								</p>
								<p>
									<strong>Expiring on:</strong>{' '}
									{new Date(item.maxTimeAllowed).toDateString()}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ViewRequest;

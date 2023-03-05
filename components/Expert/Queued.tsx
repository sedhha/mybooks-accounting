import { INavBar, IReqBE } from '@/interfaces/index';
import classes from './Expert.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

const navItems: INavBar[] = [
	{
		value: 'View Requests',
		path: 'view',
	},
	{
		value: 'Resolve Requests',
		path: 'resolve',
	},
	{
		value: 'Queued Requests',
		path: 'queued',
	},
];

const activeValue = 'View Requests';
const ViewRequest = () => {
	const router = useRouter();
	const { expertID } = router.query;
	const [tasks, setTasks] = useState<IReqBE[]>([]);
	const [activeValue, setActiveValue] = useState('Queued Requests');
	const onClickHandler = (path: string) => {
		if (!expertID || typeof expertID !== 'string') return;
		const newActiveValue = navItems.find((item) => item.path === path);
		if (newActiveValue) setActiveValue(newActiveValue.value);
		router.push(`/expert/${expertID}/${path}`);
	};
	const getData = () => {
		if (!expertID || typeof expertID !== 'string') return;
		fetch(`/api/experts/get-all-requests?isQueued=true`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-user-id': expertID,
			},
		}).then((res) =>
			res.json().then((data) => {
				setTasks([...data.payload]);
			})
		);
	};
	useEffect(() => {
		getData();
	}, [expertID]);
	return (
		<Fragment>
			<Head>
				<title>MyBooks Accounting | Expert</title>
			</Head>
			<div className={classes.Customer}>
				<NavBar
					navItems={navItems}
					activeValue={activeValue}
					onClick={onClickHandler}
				/>
				<div className={classes.raise}>
					<h1 className={classes.h1}>Expert ID: {expertID?.toString()}</h1>
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

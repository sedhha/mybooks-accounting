import { INavBar, IReqBE } from '@/interfaces/index';
import classes from './Expert.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
	const onClickHandler = (path: string) => {
		if (!expertID || typeof expertID !== 'string') return;
		router.push(`/expert/${expertID}/${path}`);
	};
	useEffect(() => {
		if (!expertID || typeof expertID !== 'string') return;
		fetch(`/api/experts/get-all-requests`, {
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
	}, [expertID]);
	const logOutHandler = () => {
		sessionStorage.removeItem('userID');
		router.push('/');
	};
	return (
		<div className={classes.Customer}>
			<NavBar
				navItems={navItems}
				activeValue={activeValue}
				onClick={onClickHandler}
			/>
			<div className={classes.raise}>
				<h1 className={classes.h1}>Expert ID: {expertID?.toString()}</h1>
				<p className={classes.logout}>
					Not {expertID?.toString()}?{' '}
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
	);
};

export default ViewRequest;

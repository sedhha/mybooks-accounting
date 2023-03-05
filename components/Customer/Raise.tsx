import { INavBar } from '@/interfaces/frontend';
import classes from './Customer.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';
import AvailableRequests from '@/constants/requests.json';
import { useState } from 'react';
import CheckBx from '@/components/Common/CheckBx';

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
const availableSelections = [
	{
		label: 'Default',
		value: 'default',
	},
	{
		label: 'Use Custom',
		value: 'custom',
	},
];
const activeValue = 'Raise Request';
const RaiseRequest = () => {
	const router = useRouter();
	const { customerID } = router.query;
	const onClickHandler = (path: string) => {
		if (!customerID || typeof customerID !== 'string') return;
		router.push(`/customer/${customerID}/${path}`);
	};
	const [activeRequest, setActiveRequest] = useState('default');
	const [task, setTask] = useState({ ...AvailableRequests[0] });
	const onDeadlineTypeChange = (newType: string) => setActiveRequest(newType);
	return (
		<div className={classes.Customer}>
			<NavBar
				navItems={navItems}
				activeValue={activeValue}
				onClick={onClickHandler}
			/>
			<div className={classes.raise}>
				<h1 className={classes.h1}>Customer ID: {customerID?.toString()}</h1>
				<div className={classes.raiseRequestForm}>
					<div className={classes.requestDropDown}>
						<p>Request Type:</p>
						<select
							onChange={(e) => {
								const updatedValue = AvailableRequests.find(
									(req) => req.id === e.target.value
								);
								if (updatedValue) setTask({ ...updatedValue });
							}}
							value={task.id}
						>
							{AvailableRequests.map((request) => (
								<option
									key={request.id}
									value={request.id}
								>
									{request.name}
								</option>
							))}
						</select>
					</div>
					<CheckBx
						selections={availableSelections}
						activeValue={activeRequest}
						onClick={onDeadlineTypeChange}
						label='Deadline:'
					/>
					<input
						className={classes.deadlineInput}
						type='number'
						placeholder='Deadline in Days'
						disabled={activeRequest === 'default'}
						defaultValue={task.defaultDeadlineInDays}
					/>
					<button type='submit'>Raise Request</button>
				</div>
			</div>
		</div>
	);
};

export default RaiseRequest;

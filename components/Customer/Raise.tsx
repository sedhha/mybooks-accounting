import { INavBar, IResponse } from '@/interfaces/index';
import classes from './Customer.module.css';
import NavBar from '@/components/Common/NavBar';
import { useRouter } from 'next/router';
import AvailableRequests from '@/constants/requests.json';
import { useState } from 'react';
import CheckBx from '@/components/Common/CheckBx';
import { IRequestItem } from '@/interfaces/Requests';

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
	const [customHourInput, setCustomHourInput] = useState(2);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<undefined | string>(undefined);
	const [success, setSuccess] = useState<boolean>(false);
	const onDeadlineTypeChange = (newType: string) => setActiveRequest(newType);
	const raiseTaskRequest = () => {
		setLoading(true);
		const payload =
			activeRequest === 'default'
				? { ...task }
				: { ...task, defaultDeadlineInDays: customHourInput };
		fetch('/api/customer/add-task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-user-id': 'sadcerfqwhdswqbakdfsbDBECwaswcsr1',
			},
			body: JSON.stringify(payload),
		})
			.then((res) =>
				res.json().then((data: IResponse<null>) => {
					if (data.error) {
						setError(data.message);
					} else {
						setSuccess(true);
						setError(undefined);
					}
				})
			)
			.finally(() => setLoading(false));
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
						value={customHourInput}
						onChange={(e) => setCustomHourInput(+e.target.value)}
					/>
					{loading ? (
						<p>Please Wait...</p>
					) : (
						<button
							type='submit'
							onClick={raiseTaskRequest}
						>
							Raise Request
						</button>
					)}
					{error != undefined && <p className={classes.error}>{error}</p>}
					{success && (
						<p className={classes.success}>Successfully added Task.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default RaiseRequest;

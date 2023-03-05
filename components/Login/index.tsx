import React, { useState } from 'react';
import classes from './Login.module.css';
import Head from 'next/head';
import CheckBx from '@/components/Common/CheckBx';
import { useRouter } from 'next/router';

const availableSelections = [
	{
		label: 'Customer',
		value: 'Customer',
	},
	{
		label: 'Expert',
		value: 'Expert',
	},
];
const LoginScreen = () => {
	const [activeValue, setActiveValue] = useState('Customer');
	const onUserTypeChange = (newType: string) => setActiveValue(newType);
	const router = useRouter();
	const [id, setID] = useState('');
	const [error, setError] = useState<string | null>(null);
	const onLogin = () => {
		fetch(`/api/login?loginID=${id}&userType=${activeValue}`, {
			method: 'GET',
		}).then((res) => {
			if (res.status === 200) {
				sessionStorage.setItem('userID', id);
				router.push(`/${activeValue.toLowerCase()}/${id}/view`);
				setError(null);
			} else setError('Invalid Credentials');
		});
	};
	return (
		<React.Fragment>
			<Head>
				<title>MyBooks Accounting | Login</title>
			</Head>
			<div className={classes.screen}>
				<div className={classes.container}>
					<h1>Login</h1>
					<div className={classes.form}>
						<label htmlFor='login-id'>Login ID</label>
						<input
							type='text'
							id='login-id'
							name='login-id'
							required
							value={id}
							onChange={(e) => setID(e.target.value)}
						/>
						<CheckBx
							selections={availableSelections}
							activeValue={activeValue}
							onClick={onUserTypeChange}
							label={'User Type:'}
						/>
						{error != null && <p className={classes.error}>{error}</p>}
						<button
							type='submit'
							onClick={onLogin}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LoginScreen;

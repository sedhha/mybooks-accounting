import React, { useState } from 'react';
import classes from './Login.module.css';
import Head from 'next/head';
import CheckBx from '@/components/Common/CheckBx';

const availableSelections = [
	{
		label: 'Customer',
		value: 'customer',
	},
	{
		label: 'Expert',
		value: 'expert',
	},
];
const LoginScreen = () => {
	const [activeValue, setActiveValue] = useState('customer');
	const onUserTypeChange = (newType: string) => setActiveValue(newType);
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
						/>
						<CheckBx
							selections={availableSelections}
							activeValue={activeValue}
							onClick={onUserTypeChange}
							label={'User Type:'}
						/>
						<button type='submit'>Login</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LoginScreen;

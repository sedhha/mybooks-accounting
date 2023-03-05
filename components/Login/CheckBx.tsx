import React from 'react';
import classes from './Login.module.css';
import CheckBoxItem from './CheckBoxItem';
import { ISelection } from '@/interfaces/frontend';



type Props = {
	onClick?: (value: string) => void;
	selections: ISelection[];
	activeValue: string;
};
const CheckBx = ({ onClick, selections, activeValue }: Props) => {
	return (
		<div className={classes.checkbox}>
			<label>User Type:</label>
			{selections.map((selection) => (
				<CheckBoxItem
					value={selection.value}
					label={selection.label}
					key={selection.value}
					activeValue={activeValue}
					onClick={onClick}
				/>
			))}
		</div>
	);
};

export default CheckBx;

import React from 'react';
import classes from './CheckBx.module.css';

type Props = {
	onClick?: (value: string) => void;
	value: string;
	label: string;
	activeValue: string;
};
const CheckBoxItem = ({ onClick, value, activeValue, label }: Props) => {
	return (
		<div className={classes.checkboxItem}>
			<input
				type='radio'
				value={value}
				checked={activeValue === value}
				required
				onChange={() => onClick?.(value)}
			/>
			<label>{label}</label>
		</div>
	);
};

export default CheckBoxItem;

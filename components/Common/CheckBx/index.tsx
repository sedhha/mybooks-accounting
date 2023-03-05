import React from 'react';
import classes from './CheckBx.module.css';
import CheckBoxItem from './CheckBxItem';
import { ISelection } from '@/interfaces/FormSelection';

type Props = {
	onClick?: (value: string) => void;
	selections: ISelection[];
	activeValue: string;
	label: string;
};
const CheckBx = ({ onClick, selections, activeValue, label }: Props) => {
	return (
		<div className={classes.checkbox}>
			<label>{label}</label>
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

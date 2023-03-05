import { INavBar } from '@/interfaces/index';
import classes from './NavBar.module.css';

type Props = {
	navItems: INavBar[];
	activeValue: string;
	onClick: (value: string) => void;
};

const NavBar = ({ navItems, activeValue, onClick }: Props) => {
	return (
		<ul className={classes.navList}>
			{navItems.map((navItem) => (
				<li
					key={navItem.value}
					is-active={`${navItem.value === activeValue}`}
					onClick={() => onClick(navItem.path)}
				>
					{navItem.value}
				</li>
			))}
		</ul>
	);
};

export default NavBar;

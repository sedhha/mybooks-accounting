import { INavBar } from '@/interfaces/frontend';
import classes from './NavBar.module.css';

type Props = {
	navItems: INavBar[];
};

const NavBar = ({ navItems }: Props) => {
	return (
		<ul className={classes.navList}>
			{navItems.map((navItem) => (
				<li
					key={navItem.value}
					is-active={`${navItem.isActive}`}
					onClick={() => navItem.onClickHandler(navItem.value)}
				>
					{navItem.value}
				</li>
			))}
		</ul>
	);
};

export default NavBar;

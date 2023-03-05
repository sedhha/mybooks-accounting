import classes from './Footer.module.css';

const otherWebsites = [
	{
		title: 'Shivam Sahil | Personal Portfolio',
		id: 0,
		href: 'https://shivam-sahil.vercel.app/',
	},
	{
		title: 'Shivam Sahil | Personal Portfolio old',
		id: 1,
		href: 'https://shivamsahil.web.app/',
	},
	{
		title: 'Insurance Center | Hackathon Project',
		id: 2,
		href: 'https://chubb-icenter.vercel.app/',
	},
	{
		title: 'Q-Manager | Quickbooks Automation',
		id: 3,
		href: 'https://q-manager.vercel.app/login',
	},
	{
		title: 'Content Management System | Assignment App',
		id: 4,
		href: 'https://cms-app-demo.vercel.app/',
	},
	{
		title: 'Articles App | Assignment App',
		id: 5,
		href: 'https://articles-zeta.vercel.app/',
	},
	{
		title: 'Apartment Rental | Assignment App',
		id: 6,
		href: 'https://apartment-rental.vercel.app/',
	},
];
const Footer = () => (
	<footer className={classes.footer}>
		You liked it? You will love these other apps created by me:
		<div className={classes.otherApps}>
			{otherWebsites.map((item) => (
				<a
					href={item.href}
					target='_blank'
					key={item.id}
				>
					{item.title}
				</a>
			))}
		</div>
	</footer>
);

export default Footer;

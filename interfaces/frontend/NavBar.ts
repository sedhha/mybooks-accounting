interface INavBar {
	value: string;
	isActive: boolean;
	onClickHandler: (value: string) => void;
}

export type { INavBar };

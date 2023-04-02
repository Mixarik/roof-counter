import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import cn from 'classnames';

import styles from './Layout.module.scss';

const headerConfig = [
	{
		name: 'Home',
		route: '/',
	},
];

export const Layout = () => {
	return (
		<>
			<nav className={cn(styles.header, 'd-flex justify-content-between align-items-center')}>
				<div className=" d-flex align-items-center justify-content-between ">
					{headerConfig.map((item) => (
						<Link className={styles.link} key={item.name + item.route} to={item.route}>
							{item.name}
						</Link>
					))}
				</div>
			</nav>
			<Outlet />
		</>
	);
};

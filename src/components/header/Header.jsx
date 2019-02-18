import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import headerCSS from './header.module.css';

const Header = (props) => {
	return (
		<Layout.Header className={headerCSS.header}>
			<div className={headerCSS.brand}>
				<h1>Cryption</h1>
			</div>
			<div className={headerCSS.github}>
				<a href="https://github.com/lagmoellertim/cryption" target="_blank">
					<Icon type="github" />
				</a>
			</div>
		</Layout.Header>
	);
};

export default Header;

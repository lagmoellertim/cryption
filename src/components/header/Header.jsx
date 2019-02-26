import React from "react";
import { Layout, Icon } from "antd";
import headerCSS from "./header.module.css";

const Header = (props) => {
	return (
		<Layout.Header className={headerCSS.header}>
			<div className={headerCSS.brand}>
				<h1>Cryption</h1>
			</div>
			<div className={headerCSS.github}>
				<a href="https://github.com/lagmoellertim/cryption" target="_blank" rel="noopener noreferrer">
					<Icon type="github" />
				</a>
			</div>
		</Layout.Header>
	);
};

export default Header;

import React from "react";
import { Layout, Icon } from "antd";
import FooterCSS from "./Footer.module.css";

const Footer = () => {
	return (
		<Layout.Footer className={FooterCSS.footer}>
			<div className={FooterCSS.footerContainer}>
				<p>
					Made with <Icon type="heart" theme="filled" /> by{" "}
					<a href="https://en.lagmoellertim.de">Tim-Luca Lagmöller</a>
				</p>
				<a href="http://donate.lagmoellertim.de">Donate</a>
			</div>
		</Layout.Footer>
	);
};

export default Footer;

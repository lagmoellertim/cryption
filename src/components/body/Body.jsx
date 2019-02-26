import React from "react";
import bodyCSS from "./body.module.css";
import Container from "./container/Container";

const Body = (props) => {
	return (
		<div className={bodyCSS.body}>
			<Container />
		</div>
	);
};

export default Body;

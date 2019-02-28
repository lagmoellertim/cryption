import React from "react";
import PasswordMeterCSS from "./PasswordMeter.module.css";
import * as PasswordMeterLogic from "./PasswordMeter.logic";

export default ({ password }) => {
	const strength = PasswordMeterLogic.scorePassword(password);

	return (
		<div className={PasswordMeterCSS.meter}>
			<div className={PasswordMeterCSS.bar + " " + PasswordMeterCSS[strength]} />
		</div>
	);
};

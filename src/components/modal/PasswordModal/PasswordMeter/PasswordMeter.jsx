import React from "react";
import PasswordMeterCSS from "./PasswordMeter.module.css";
import * as PasswordMeterLogic from "./PasswordMeter.logic";

export default ({ password }) => {
	const strength = PasswordMeterLogic.scorePassword(password);
	const strengthMap = {
		null: PasswordMeterCSS.invisible,
		0: PasswordMeterCSS.weak,
		1: PasswordMeterCSS.good,
		2: PasswordMeterCSS.strong
	};

	const getMatchingClass = () => {
		if (strength in strengthMap) {
			return strengthMap[strength];
		}
		return PasswordMeterCSS.invisible;
	};

	const strengthClass = getMatchingClass();

	return (
		<div className={PasswordMeterCSS.meter}>
			<div className={PasswordMeterCSS.bar + " " + strengthClass} />
		</div>
	);
};

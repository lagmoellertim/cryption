import React, { useEffect } from "react";
import { Modal, Steps, Icon } from "antd";
import { connect } from "react-redux";
import { mapState, mapDispatch } from "./StepModal.map";
import * as StepModalLogic from "./StepModal.logic";
const Step = Steps.Step;

const StepModal = (props) => {
	const { steps, currentStep, show } = props.modal;
	useEffect(() => {
		if (!props.process.active && show) {
			StepModalLogic.initialize(props);
			props.isProcessActive(true);
		}
	});
	return (
		<Modal title="Please wait" visible={show} footer={null} closable={false}>
			<Steps direction="vertical" current={currentStep}>
				{steps.map((step) => {
					const index = steps.indexOf(step);
					if (index < currentStep) {
						return <Step description="" title={step} key={index} />;
					} else if (index > currentStep) {
						return <Step description="" title={step} key={index} />;
					} else {
						return <Step description="" title={step} icon={<Icon type="loading" />} key={index} />;
					}
				})}
			</Steps>
		</Modal>
	);
};

export default connect(mapState, mapDispatch)(StepModal);

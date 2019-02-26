import React, { Component } from "react";
import { Modal, Form, Input, Icon } from "antd";
import { connect } from "react-redux";
import { mapState, mapDispatch } from "./PasswordModal.map";
import * as PasswordModalLogic from "./PasswordModal.logic";
import PasswordMeter from "./PasswordMeter/PasswordMeter";

const PasswordModalForm = Form.create({ name: "form_in_modal" })(
	// eslint-disable-next-line
	class extends Component {
		render() {
			const { visible, onCancel, onCreate, form, hint, mode } = this.props;
			const { getFieldDecorator } = form;
			let passwordField = this.props.form.getFieldValue("password");

			return (
				<Modal
					visible={visible}
					title={mode !== "decrypt" ? "Encryption" : "Decryption"}
					okText={mode !== "decrypt" ? "Encrypt" : "Decrypt"}
					onCancel={onCancel}
					onOk={onCreate}
				>
					<Form layout="vertical">
						<Form.Item label="Password">
							{getFieldDecorator("password", {
								rules: [ { required: true, message: "Please input your Password!" } ]
							})(<Input.Password placeholder="Input Password" />)}

							{mode !== "decrypt" ? <PasswordMeter password={passwordField} /> : ""}
						</Form.Item>
						{hint !== null || mode !== "decrypt" ? (
							<Form.Item label="Hint">
								{mode !== "decrypt" ? (
									getFieldDecorator("hint", {
										rules: [ { required: false } ]
									})(
										<Input
											placeholder="Input Hint"
											prefix={<Icon type="info-circle" style={{ color: "rgb(0,0,0)" }} />}
										/>
									)
								) : (
									hint
								)}
							</Form.Item>
						) : null}
					</Form>
				</Modal>
			);
		}
	}
);

class PasswordModal extends Component {
	handleCreate = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			form.resetFields();
			PasswordModalLogic.onFormData(this.props, values);
		});
	};

	saveFormRef = (formRef) => {
		this.formRef = formRef;
	};

	onReset = () => {
		const form = this.formRef.props.form;
		form.resetFields();
		this.props.onReset();
	};

	render() {
		return (
			<PasswordModalForm
				wrappedComponentRef={this.saveFormRef}
				visible={this.props.modal.show}
				onCancel={this.onReset}
				onCreate={this.handleCreate}
				hint={this.props.hint}
				mode={this.props.mode}
			/>
		);
	}
}

export default connect(mapState, mapDispatch)(PasswordModal);

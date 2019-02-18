import React, { Component } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { mapState, mapDispatch } from './PasswordModal.map';
import * as PasswordModalLogic from './PasswordModal.logic';

const PasswordModalForm = Form.create({ name: 'form_in_modal' })(
	// eslint-disable-next-line
	class extends Component {
		render() {
			const { visible, onCancel, onCreate, form, hint, mode } = this.props;
			const { getFieldDecorator } = form;
			return (
				<Modal
					visible={visible}
					title={mode !== 'decrypt' ? 'Encryption' : 'Decryption'}
					okText={mode !== 'decrypt' ? 'Encrypt' : 'Decrypt'}
					onCancel={onCancel}
					onOk={onCreate}
				>
					<Form layout="vertical">
						<Form.Item label="Password">
							{getFieldDecorator('password', {
								rules: [ { required: true, message: 'Please input your Password!' } ]
							})(<Input.Password placeholder="Input Password" />)}
						</Form.Item>
						{hint !== null || mode !== 'decrypt' ? (
							<Form.Item label="Hint">
								{mode != 'decrypt' ? (
									getFieldDecorator('hint', {
										rules: [ { required: false } ]
									})(
										<Input
											placeholder="Input Hint"
											prefix={<Icon type="info-circle" style={{ color: 'rgb(0,0,0)' }} />}
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

	render() {
		return (
			<PasswordModalForm
				wrappedComponentRef={this.saveFormRef}
				visible={this.props.modal.show}
				onCancel={this.props.onReset}
				onCreate={this.handleCreate}
				hint={this.props.hint}
				mode={this.props.mode}
			/>
		);
	}
}

export default connect(mapState, mapDispatch)(PasswordModal);

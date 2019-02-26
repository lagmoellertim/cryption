import React from "react";
import ContainerCSS from "./Container.module.css";
import FileSelect from "./fileselect/FileSelect";
import PasswordModal from "../../modal/PasswordModal/PasswordModal";
import StepModal from "../../modal/StepModal/StepModal";

const Container = (props) => {
	return (
		<div className={ContainerCSS.container}>
			<h1>Decrypt and Encrypt Files</h1>
			<h3>
				Protect your data by using Cryption. Using AES-Encryption and our .cryption File Format, your Data is
				encrypted and decrypted securely in your browser.
			</h3>
			<PasswordModal />
			<StepModal />

			<FileSelect />
		</div>
	);
};

export default Container;

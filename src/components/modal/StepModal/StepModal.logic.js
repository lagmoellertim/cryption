import mainWorker from "../../../worker/worker";
import FileSaver from "file-saver";
import {
    Modal
} from "antd";

export const initialize = (props) => {
    let steps = [];

    if (props.files.mode !== "decrypt") {
        if (props.files.mode === "encrypt-multiple") {
            steps = ["Combine Files to ZIP"];
        } else {
            steps = ["Transform File"];
        };
        steps = [...steps,
            "Salt and Hash Key",
            "Encrypt File with AES",
            "Generate MD5-Hash",
            "Generate and Encrypt SHA256-Hash",
            "Encrypt Filename",
            "Generate Metadata",
            "Create Cryptionfile"
        ];
    } else {
        steps = ["Salt and Hash Key",
            "Read Cryptionfile",
            "Decrypt File with AES",
            "Generate SHA256-Hash",
            "Check Data Integrity",
            "Decrypt Filename",
            "Recreate File"
        ];
    };

    const worker = mainWorker();

    props.setSteps(steps);

    worker.addEventListener("message", (e) => {
        if (e.data === "incrementProgress") {
            props.nextStep();
        };
    });


    if (props.files.mode === "encrypt-multiple") {
        worker.combineToZip(props.files.fileList).then((data) => {
            props.nextStep();
            worker.encrypt(data, "package.zip", props.files.password, props.files.hint).then((obj) => {
                Modal.success({
                    title: "Success",
                    content: "The files were zipped and encrypted successfully, you will be able to save the Cryptionfile now",
                    onOk: () => props.reset()
                });
                FileSaver.saveAs(obj.file, obj.name);
            });
        });
    } else if (props.files.mode === "encrypt") {
        worker.fileToData(props.files.fileList[0]).then((data) => {
            props.nextStep();
            worker.encrypt(data, props.files.fileList[0].name, props.files.password, props.files.hint).then((obj) => {
                Modal.success({
                    title: "Success",
                    content: "The file was encrypted successfully, you will be able to save the Cryptionfile now",
                    onOk: () => props.reset()
                });
                FileSaver.saveAs(obj.file, obj.name);
            });
        });
    } else {
        worker.decrypt(props.files.fileList[0], props.files.password).then((obj) => {
            if (obj.error == null) {
                Modal.success({
                    title: "Success",
                    content: "The file was decrypted successfully, you will be able to save it now",
                    onOk: () => props.reset()
                });
                FileSaver.saveAs(obj.file, obj.name);
            } else {
                if (obj.error === "key-incorrect-or-corrupted") {
                    Modal.error({
                        title: "Key incorrect or File corrupted",
                        content: "The file could not be decrypted, maybe you entered the wrong password or the file got damaged",
                        onOk: () => props.reset()
                    });
                } else if (obj.error === "no-integrity") {
                    Modal.error({
                        title: "No File Integrity",
                        content: "One or multiple hashes did not match, meaning the file must have been manipulated",
                        onOk: () => props.reset()
                    });
                };
            };
        });
    }
};
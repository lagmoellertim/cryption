import mainWorker from "../../../../worker/worker";

export const onDrop = (props, fileList) => {
    const worker = mainWorker();
    worker.handleFiles(fileList).then((mode) => {
        if (mode === "decrypt") {
            worker.getHint(fileList[0]).then((hint) => {
                props.onFilesAdded(fileList, mode, hint);
            });
        } else {
            props.onFilesAdded(fileList, mode);
        }
    });
};
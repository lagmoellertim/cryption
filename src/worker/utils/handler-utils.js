export const combineToZip = async (fileList) => {
    var zip = new JSZip();
    await asyncForEach(fileList, async (file) => {
        zip.file(file.name, file);
    });
    return zip.generateAsync({
        type: "base64"
    });
}
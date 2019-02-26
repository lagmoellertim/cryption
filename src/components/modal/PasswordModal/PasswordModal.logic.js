export const onFormData = (props, data) => {
    props.updateFileInfo(data.password, data.hint);
};
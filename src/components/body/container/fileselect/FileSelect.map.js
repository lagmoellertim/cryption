export const mapState = (state) => {
    return {};
};

export const mapDispatch = (dispatch) => {
    return {
        onFilesAdded(fileList, mode, hint) {
            dispatch({
                type: "ADD_FILES",
                payload: {
                    fileList,
                    mode,
                    hint
                }
            });
        }
    };
};
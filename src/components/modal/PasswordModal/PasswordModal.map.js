export const mapState = (state) => {
    return {
        modal: state.passwordModal,
        hint: state.files.hint,
        mode: state.files.mode
    };
};

export const mapDispatch = (dispatch) => {
    return {
        onReset() {
            dispatch({
                type: "RESET",
                payload: {}
            });
        },
        updateFileInfo(password, hint) {
            dispatch({
                type: "ADD_FORM_DATA",
                payload: {
                    password,
                    hint
                }
            });
        }
    };
};
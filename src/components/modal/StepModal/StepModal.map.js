export const mapState = (state) => {
    return {
        modal: state.stepModal,
        files: state.files,
        process: state.process
    };
};

export const mapDispatch = (dispatch) => {
    return {
        setSteps(steps) {
            dispatch({
                type: "SET_STEPS",
                payload: {
                    steps
                }
            });
        },
        nextStep() {
            dispatch({
                type: "INCREMENT_STEP",
                payload: {}
            });
        },
        isProcessActive(active) {
            dispatch({
                type: "PROCESS_ACTIVE",
                payload: {
                    active
                }
            });
        },
        processFinished(status) {
            dispatch({
                type: "PROCESS_FINISHED",
                payload: {
                    status
                }
            });
        },
        reset() {
            dispatch({
                type: "RESET",
                payload: {}
            });
        },
    };
};
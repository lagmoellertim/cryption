// eslint-disable-next-line import/no-webpack-loader-syntax

const initialState = {
    stepModal: {
        show: false,
        steps: [],
        currentStep: 0
    },
    passwordModal: {
        show: false,
    },
    files: {
        mode: null,
        fileList: [],
        data: null,
        hint: null,
        password: null
    },
    process: {
        active: false,
        status: ""
    }
};

export default (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case "RESET":
            return initialState;

        case "ADD_FILES":
            return {
                ...state,
                files: {
                    ...state.files,
                    fileList: payload.fileList,
                    mode: payload.mode,
                    hint: payload.hint
                },
                passwordModal: {
                    show: true
                }
            };

        case "ADD_FORM_DATA":
            return {
                ...state,
                files: {
                    ...state.files,
                    hint: payload.hint,
                    password: payload.password
                },
                passwordModal: {
                    show: false
                },
                stepModal: {
                    ...state.stepModal,
                    show: true
                }
            };

        case "SET_STEPS":
            return {
                ...state,
                stepModal: {
                    ...state.stepModal,
                    steps: payload.steps
                }
            };

        case "INCREMENT_STEP":
            return {
                ...state,
                stepModal: {
                    ...state.stepModal,
                    currentStep: state.stepModal.currentStep + 1
                }
            };

        case "PROCESS_ACTIVE":
            return {
                ...state,
                process: {
                    active: payload.active
                }
            };

        case "PROCESS_FINISHED":
            return {
                ...initialState,
                process: {
                    active: false,
                    status: payload.status
                }
            };

        default:
            return state;
    }
};
import { userRequest } from "../ActionType";

const toggleState = {
    auth: "",
    profile: "",
    form_popup: "",
    feedback: "",
    loader: false,
};
const toggleReducer = (state = toggleState, { type, payload }) => {
    switch (type) {
        case userRequest.AUTH:
            return { ...state, auth: payload };
        case userRequest.profile:
            return { ...state, profile: payload };
        case userRequest.form_popup:
            return { ...state, form_popup: payload };
        case userRequest.feedback:
            return { ...state, feedback: payload };
        case userRequest.loader:
            return { ...state, loader: payload };
        default:
            return state;
    }
};
export default toggleReducer;

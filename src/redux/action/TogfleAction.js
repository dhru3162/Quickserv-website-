import { userRequest } from "../ActionType";

export const SignUpAction = (response) => {
    return {
        type: userRequest.AUTH,
        payload: response,
    };
};
export const ProfilePopUpAction = (response) => {
    return {
        type: userRequest.profile,
        payload: response,
    };
};
export const FormPopUpAction = (response) => {
    return {
        type: userRequest.form_popup,
        payload: response,
    };
};
export const FeedbackPopUpAction = (response) => {
    return {
        type: userRequest.feedback,
        payload: response,
    };
};
export const LoaderAction = (response) => {
    return {
        type: userRequest.loader,
        payload: response,
    };
};

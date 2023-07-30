import { userRequest } from "../ActionType";

export const LoginAction = (response) => {
    return {
        type: userRequest.USER,
        payload: response,
    };
};

export const LogoutAction = (response) => {
    return {
        type: userRequest.USER,
        payload: response,
    };
};

export const AddressAction = (response) => {
    return {
        type: userRequest.ADDRESS,
        payload: response,
    };
};

export const FormMasterData = (response) => {
    return {
        type: userRequest.FORM_MASTER_DATA,
        payload: response,
    };
};

import { contactUs } from "../ActionType";

const initState = {
    loading: false,
    data: {},
    error: "",
};

export const contactUsReducer = (state = initState, action) => {
    switch (action.type) {
        case contactUs.START_CONTACT_US:
            return {
                ...state,
                loading: true,
            };
        case contactUs.SUCCESS_CONTACT_US:
            return {
                loading: false,
                data: action.payload,
                error: "",
            };
        case contactUs.ERROR_CONTACT_US:
            console.log("====>>>>>", action);
            return {
                loading: false,
                data: {},
                error: action.message,
            };
        default:
            return state;
    }
};

import axios from "axios";
import API_ROUTES from "../../api/api";
import { contactUs } from "../ActionType";

export const ContactUsActionLoading = (response) => {
    return {
        type: contactUs.START_CONTACT_US,
    };
};

export const ContactUsActionSubmit = (response) => async (dispatch) => {
    dispatch(ContactUsActionLoading());
    try {
        const { data } = await axios.post(API_ROUTES.SubmitContactUs, response);
        dispatch({ type: contactUs.SUCCESS_CONTACT_US, payload: data });
    } catch (error) {
        dispatch(ContactUsActionError(error));
    }
};

export const ContactUsActionError = (response) => {
    return {
        type: contactUs.ERROR_CONTACT_US,
        payload: response,
    };
};

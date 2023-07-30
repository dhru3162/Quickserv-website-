import axios from "axios";
import { sellRequest } from "../ActionType";
import API_ROUTES from "../../api/api";

export const SellActionLoading = () => {
    return {
        type: sellRequest.SELL_LOADING,
    };
};
export const SellActionData = (response) => async (dispatch) => {
    dispatch(SellActionLoading());
    try {
        const { data } = await axios.post(API_ROUTES.SELL_API, response);
        dispatch({
            type: sellRequest.SELL_DATA,
            payload: response,
        });
    } catch (error) {
        dispatch(SellActionError(error));
    }
};

export const SellActionError = (response) => {
    return {
        type: sellRequest.SELL_ERROR,
        payload: response,
    };
};

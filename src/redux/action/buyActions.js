import axios from "axios";
import { buyRequest } from "../ActionType";
import API_ROUTES from "../../api/api";

export const BuyActionLoading = () => async () => {
    return { type: buyRequest.LOADING_BUY_REQUEST };
};

export const BuyActionCreate = (payloadData) => async (dispatch) => {
    dispatch(BuyActionLoading());

    try {
        const { data } = await axios.post(API_ROUTES, payloadData);
        dispatch({ type: buyRequest.CREATE_BUY_REQUEST, payload: data });
    } catch (error) {
        dispatch(BuyActionError(error));
    }
};

export const BuyActionError = (error) => async () => {
    return {
        type: buyRequest.LOADING_BUY_REQUEST,
        payload: error,
    };
};

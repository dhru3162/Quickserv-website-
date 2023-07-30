import { sellRequest } from "../ActionType";

const sellDetails = {
    loading: false,
    data: {},
    error: "",
};

export const sellReducer = (state = sellDetails, action) => {
    switch (action.type) {
        case sellRequest.SELL_LOADING:
            return {
                ...state,
                loading: true,
            };
        case sellRequest.SELL_DATA:
            return {
                loading: false,
                data: action.payload,
                error: "",
            };
        case sellRequest.SELL_ERROR:
            return {
                loading: false,
                data: {},
                error: action.message,
            };
        default:
            return state;
    }
};

import { buyRequest } from "../ActionType";

const initState = {
    loading: "false",
    data: {},
    error: "",
};

export const buyReducer = (state = initState, action) => {
    switch (action.type) {
        case buyRequest.LOADING_BUY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case buyRequest.CREATE_BUY_REQUEST:
            return {
                loading: false,
                data: action.payload,
                error: "",
            };
        case buyRequest.ERROR_BUY_REQUEST:
            return {
                loading: false,
                data: {},
                error: action.payload.error,
            };

        default:
            return state;
    }
};

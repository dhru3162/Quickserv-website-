import { userRequest } from "../ActionType";

const AdminState = {
    user: null,
    address: [],
    formMasterData: null,
};
const userReducer = (state = AdminState, { type, payload }) => {
    switch (type) {
        case userRequest.USER:
            return { ...state, user: payload };
        case userRequest.ADDRESS:
            return { ...state, address: payload };
        case userRequest.FORM_MASTER_DATA:
            return { ...state, formMasterData: payload };
        default:
            return state;
    }
};
export default userReducer;

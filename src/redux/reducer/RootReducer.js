import { combineReducers } from "redux";
import userReducer from "../reducer/userReducer";
import toggleReducer from "./toggleReducer";
import { sellReducer } from "./sellReducer";
import { contactUsReducer } from "./ContactUsReducer";
import { buyReducer } from "./buyReducer";

const RootReducer = combineReducers({
    user: userReducer,
    toggle: toggleReducer,
    contactUs: contactUsReducer,
    buy: buyReducer,
    sell: sellReducer,
});

export default RootReducer;

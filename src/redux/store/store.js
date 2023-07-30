import RootReducer from "../reducer/RootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(
    RootReducer,
    {},
    applyMiddleware(thunk)
    // window.window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;

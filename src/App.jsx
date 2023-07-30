import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import React from "react";

import Routing from "./routing/Routing";
import store from "./redux/store/store";

const App = () => {
    return (
        <>
            <Provider store={store}>
                <Routing />
            </Provider>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
};

export default App;

import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import {
    FeedbackPopUpAction,
    ProfilePopUpAction,
    FormPopUpAction,
    SignUpAction,
} from "../redux/action/TogfleAction";
import { AddressAction, LoginAction } from "../redux/action/userAction";
import API_ROUTES, { getHeader } from "../api/api";
import Contactus from "../pages/Contactus";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Aboutus from "../pages/Aboutus";
import Career from "../pages/Career";
import Home from "../pages/Home";
import RefundPolicy from "../component/Policy/RefundPolicy";
import PaymentPolicy from "../component/Policy/PaymentPolicy";
import PrivacyPolicy from "../component/Policy/PrivacyPolicy";
import TermsAndConditions from "../component/Policy/termsAndCondition";

const Routing = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { auth, profile, form_popup, feedback } = useSelector(
        (state) => state?.toggle
    );

    useEffect(() => {
        if (form_popup) {
            dispatch(FormPopUpAction(""));
        }
        if (profile) {
            dispatch(ProfilePopUpAction(""));
        }
        if (feedback) {
            dispatch(FeedbackPopUpAction(""));
        }
        if (auth) {
            dispatch(SignUpAction(""));
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = JSON.parse(localStorage.getItem("user"));
                if (data) {
                    dispatch(LoginAction(data));
                }

                const header = getHeader();

                const customerProfileResponse = await axios.post(
                    API_ROUTES.GetCustomerProfileDetails,
                    {},
                    header
                );
                if (customerProfileResponse?.data?.IsSuccess) {
                    const {
                        AreaId,
                        CityId,
                        Address,
                        FirstName,
                        LastName,
                        Mobile,
                        PinCodeId,
                        StateId,
                        Email,
                    } = customerProfileResponse?.data?.Data;
                    let obj = {
                        AreaId,
                        CityId,
                        Address,
                        FullName: FirstName + LastName,
                        Mobile,
                        PinCodeId,
                        StateId,
                        Email,
                        typeOfAddress: "Home",
                    };
                    dispatch(AddressAction([obj, obj]));
                }
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with an error status code
                    const errorMessage = error.response.data.Message;
                    toast.error(errorMessage);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred while making the request.");
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/contact-us" element={<Contactus />} />
                <Route path="/career" element={<Career />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/payment-policy" element={<PaymentPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsAndConditions />} />
                <Route
                    path="/terms-conditions"
                    element={<TermsAndConditions />}
                />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
};

export default Routing;

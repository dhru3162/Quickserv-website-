import axios from "axios";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "../../css/auth/signup.css";
import icons from "../../icons/icon";
import API_ROUTES from "../../api/api";
import auths from "../../static/auth/auth";
import { LoginAction } from "../../redux/action/userAction";
import { SignUpAction } from "../../redux/action/TogfleAction";

const SignIn = () => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState("login");

    const handleSignIn = (e) => {
        e.preventDefault();
        // Perform form validation

        if (!phoneNumber) {
            toast.error("Please enter your phone number.");
            return;
        } else if (phoneNumber.length !== 10) {
            toast.error("Please enter 10 digit number.");
            return;
        } else {
            axios
                .post(API_ROUTES.GetOTPForCustomerLogin, {
                    MobileNo: phoneNumber,
                })
                .then((res) => {
                    if (res?.data?.IsSuccess) {
                        setIsOtpSent("otp");
                        toast.success(res?.data?.Message);
                    } else {
                        toast.error(res?.data?.Message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("There is some issue ");
                });
        }
    };

    const handleOTP = (e) => {
        e.preventDefault();
        // Perform OTP validation
        if (!otp) {
            toast.error("Please enter the OTP.");
            return;
        }
        // send request to server
        axios
            .post(API_ROUTES.LoginByOTP, { MobileNo: phoneNumber, OTP: otp })
            .then((res) => {
                console.log(res);
                if (res?.data?.IsSuccess) {
                    toast.success(res?.data?.Message);
                    dispatch(SignUpAction(""));
                    dispatch(LoginAction(res?.data?.Data));
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res?.data?.Data)
                    );
                    console.log(res?.data?.Data);
                } else toast.success(res?.data?.Message);
            })
            .catch((err) => {
                if (err?.data?.IsSuccess) {
                    toast.error(err?.data?.Message);
                } else toast.error("Trere is some technical issue");
            });

        // Reset form and state
        setPhoneNumber("");
        setOtp("");
        setIsOtpSent("");
    };

    return (
        <>
            {isOtpSent && (
                <div className="signup-container">
                    <button
                        onClick={() => dispatch(SignUpAction(""))}
                        className="pop-close"
                    >
                        &times;
                    </button>
                    <div className="signup-card ">
                        <div className="s-c-header">
                            <div>
                                <h1>Sign In</h1>
                            </div>
                            <img src={icons.LOGO} alt="" />
                        </div>
                        <div className="s-c-form sign-in">
                            {isOtpSent === "otp" && (
                                <form>
                                    <div className="form-row form-row-otp">
                                        <div className="form-input">
                                            <label htmlFor="signin-phone">
                                                Enter OTP
                                            </label>
                                            <OTPInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}
                                                renderInput={(props) => (
                                                    <input
                                                        {...props}
                                                        style={{
                                                            margin: "0 .85rem",
                                                            boxShadow:
                                                                "0 2px 4px rgba(0, 0, 0, 0.2)",
                                                            width: "60px",
                                                            height: "40px",
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <button
                                            onClick={handleOTP}
                                            className="btn active"
                                        >
                                            Verify OTP
                                        </button>
                                        <div className="not-register">
                                            <strong onClick={handleSignIn}>
                                                Resend OTP
                                            </strong>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {isOtpSent === "login" && (
                                <form>
                                    <div className="form-row">
                                        <div className="form-input">
                                            <label htmlFor="signin-phone">
                                                Enter Phone Number
                                            </label>
                                            <input
                                                className="login-with-phone"
                                                placeholder="Enter phone number"
                                                type="text"
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <button
                                            onClick={handleSignIn}
                                            className="btn active"
                                        >
                                            Get OTP
                                        </button>
                                        <div className="not-register">
                                            Not registered?{" "}
                                            <strong
                                                onClick={() =>
                                                    dispatch(
                                                        SignUpAction("signup")
                                                    )
                                                }
                                            >
                                                Sign Up
                                            </strong>
                                        </div>
                                    </div>
                                </form>
                            )}
                            <img src={auths.signin} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignIn;

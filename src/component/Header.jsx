import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

import {
    ProfilePopUpAction,
    FormPopUpAction,
    SignUpAction,
} from "../redux/action/TogfleAction";
import { Notification, Profile } from "./user/ProfilePopUp";
import assets, { navlist } from "../static/assets/assets";
import SignUp from "../component/Auth/SignUp";
import FormPopUp from "./form/FormPopUp";
import SignIn from "./Auth/SignIn";
import icons from "../icons/icon";
import Loader from "./Loader";

const Header = () => {
    const dispatch = useDispatch();

    const { auth, profile, form_popup, loader } = useSelector(
        (state) => state?.toggle
    );

    const { user } = useSelector((state) => state?.user);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(".header");
            if (window.pageYOffset > 0) {
                header.classList.add("sticky-header");
            } else {
                header.classList.remove("sticky-header");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (auth || form_popup) {
            document.body.classList.add("popup-open");
        } else {
            document.body.classList.remove("popup-open");
        }
    }, [auth, form_popup]);

    const HandleProfilePopUp = (input) => {
        if (!auth && input == "profile") {
            dispatch(ProfilePopUpAction("profile"));
        } else if (!auth && input == "notify") {
            dispatch(ProfilePopUpAction("notify"));
        } else {
            dispatch(ProfilePopUpAction(""));
        }
    };

    return (
        <>
            <section className="header">
                <div className="header-left">
                    <div className="logo">
                        <Link to="/">
                            <img src={icons.LOGO} alt="Orarega" />
                        </Link>
                    </div>
                </div>
                <div className="header-center">
                    <ul className="">
                        {navlist.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() =>
                                        dispatch(FormPopUpAction(item?.path))
                                    }
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="header-right">
                    {user ? (
                        <div className="user-profile">
                            <img src={assets.PROFILE} alt="" />
                            <span onClick={() => HandleProfilePopUp("profile")}>
                                <span>{user?.Name}</span> <span>&#9660;</span>
                            </span>
                            <div
                                onClick={() => HandleProfilePopUp("notify")}
                                className="notification"
                            >
                                <img src={icons.notification} alt="" />
                                {true && <span></span>}
                            </div>
                        </div>
                    ) : (
                        <div className="signin-signup">
                            <button
                                onClick={() => dispatch(SignUpAction("signin"))}
                                className="btn"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => dispatch(SignUpAction("signup"))}
                                className="btn"
                            >
                                SignUp
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {profile &&
                ((profile == "profile" && <Profile />) || <Notification />)}

            {auth == "signup" ? (
                <SignUp />
            ) : ["signin", "otp"].includes(auth) ? (
                <SignIn />
            ) : (
                <></>
            )}

            {form_popup && <FormPopUp />}

            {loader && <Loader />}
        </>
    );
};

export default Header;

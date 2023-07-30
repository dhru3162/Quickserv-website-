import React, { useEffect, useRef } from "react";
import "./profile-pop-up.css";
import { useDispatch, useSelector } from "react-redux";
import {
    FormPopUpAction,
    ProfilePopUpAction,
} from "../../redux/action/TogfleAction";
import { useNavigate } from "react-router-dom";
import { navlist, profileList } from "../../static/assets/assets";
import { LogoutAction } from "../../redux/action/userAction";
import axios from "axios";
import API_ROUTES, { getHeader } from "../../api/api";
import { toast } from "react-toastify";

const useOutsideAlerter = (ref) => {
    const dispatch = useDispatch();
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(ProfilePopUpAction(""));
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export const Profile = () => {
    const profileRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ProfileHadler = (path) => {
        if (path === "about") {
            navigate("/about-us");
            dispatch(ProfilePopUpAction(""));
        } else if (path === "contact") {
            navigate("/contact-us");
            dispatch(ProfilePopUpAction(""));
        } else if (path === "work-order") {
            dispatch(FormPopUpAction("work-order"));
            dispatch(ProfilePopUpAction(""));
        } else if (path === "track-request") {
            dispatch(FormPopUpAction("track-request"));
            dispatch(ProfilePopUpAction(""));
        } else if (path === "quotation") {
            dispatch(FormPopUpAction("quotation"));
            dispatch(ProfilePopUpAction(""));
        } else if (path === "invoice") {
            dispatch(FormPopUpAction("invoice"));
            dispatch(ProfilePopUpAction(""));
        } else if (path === "profile") {
            dispatch(FormPopUpAction("profile"));
            dispatch(ProfilePopUpAction(""));
        } else if (path === "address") {
            dispatch(FormPopUpAction("address"));
            dispatch(ProfilePopUpAction(""));
        } else if (path === "logout") {
            const config = getHeader();
            if (config) {
                axios
                    .post(API_ROUTES.Logout, null, config)
                    .then((res) => {
                        console.log(res);
                        if (res?.data?.IsSuccess) {
                            toast.success(res?.data?.Message);
                            dispatch(LogoutAction(null));
                            dispatch(ProfilePopUpAction(""));
                            dispatch(FormPopUpAction(""));
                            localStorage.clear("user");
                        } else {
                            toast.error(res?.data?.Message);
                        }
                    })
                    .catch((err) => {
                        toast.error(
                            "There is some technical issue which loging out"
                        );
                    });
            }
            dispatch(ProfilePopUpAction(""));
        }
    };
    useOutsideAlerter(profileRef);
    return (
        <>
            <div ref={profileRef} className="profile-popup">
                {profileList.map((item, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => ProfileHadler(item.path)}
                            className="menu-item"
                        >
                            {item.name}
                        </div>
                    );
                })}
                <ul className="mobile-navbar">
                    {navlist.map((item, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() =>
                                    dispatch(FormPopUpAction(item?.path))
                                }
                                className="menu-item"
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export const Notification = () => {
    const ref = useRef(null);
    useOutsideAlerter(ref);
    return (
        <div ref={ref} className="profile-popup notification-popup">
            <div className="notifi-item">
                <span></span>
                <div className="n-i-type">
                    <span>Your Payment</span>
                    <span>Document</span>
                </div>
            </div>
            <div className="notifi-item">
                <span></span>
                <div className="n-i-type">
                    <span>Your Payment</span>
                    <span>Document</span>
                </div>
            </div>
        </div>
    );
};

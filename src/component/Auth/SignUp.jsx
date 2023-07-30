import "../../css/auth/signup.css";

import API_ROUTES, { MasterApi } from "../../api/api";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { SignUpAction } from "../../redux/action/TogfleAction";
import auth from "../../static/auth/auth";
import axios from "axios";
import icons from "../../icons/icon";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const SignUp = () => {
    const dispatch = useDispatch();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [area, setArea] = useState([]);
    const [pincode, setPincode] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: [
            {
                Id: 0,
                Address: "string",
                StateId: 0,
                CityId: 0,
                AreaId: 0,
                PinCodeId: 0,
                IsActive: true,
                IsDefault: false,
            },
        ],
        state: "",
        city: "",
        pincode: "",
        area: "",
        termsAndCondition: termsAccepted,
    });
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Define validation rules
        const validationRules = {
            firstName: {
                required: true,
                message: "Please enter your first name.",
            },
            lastName: {
                required: true,
                message: "Please enter your last name.",
            },
            email: {
                required: true,
                message: "Please enter your email address.",
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                // Additional validation rules can be added, such as checking for a valid email format
            },
            phoneNumber: {
                required: true,
                message: "Please enter your phone number.",
                pattern: /^\d{10}$/,
                // Additional validation rules can be added, such as checking for a valid phone number format
            },
            address: {
                required: true,
                message: "Please enter your address.",
            },
            state: {
                required: true,
                message: "Please select your state.",
            },
            city: {
                required: true,
                message: "Please enter your city.",
            },
        };
        // Perform form validation
        let isValid = true;
        const errors = {};
        for (const field in validationRules) {
            const rule = validationRules[field];
            const value = formData[field];

            if (rule.required && !value) {
                isValid = false;
                errors[field] = rule.message;
            } else if (rule.pattern && !rule.pattern.test(value)) {
                isValid = false;
                errors[field] = `Invalid ${field}.`;
            }
        }

        if (!isValid) {
            // Display error toast for validation errors
            toast.error("Please fix the form errors.");
            return;
        } else if (!termsAccepted) {
            toast.error("Please accept all the terms and conditions ");
        }
        // Proceed with form submission
        else {
            const formDataSignUp = new FormData();
            formDataSignUp.append("FirstName", formData.firstName);
            formDataSignUp.append("LastName", formData.lastName);
            formDataSignUp.append("Email", formData.email);
            formDataSignUp.append("Mobile", String(formData.phoneNumber));
            formDataSignUp.append("Address", [
                {
                    Id: 0,
                    Address: "string",
                    StateId: 0,
                    CityId: 0,
                    AreaId: 0,
                    PinCodeId: 0,
                    IsActive: true,
                    IsDefault: false,
                },
            ]);
            formDataSignUp.append("StateId", Number(formData.state));
            formDataSignUp.append("CityId", Number(formData.city));
            formDataSignUp.append("AreaId", Number(formData.area) || 1);
            formDataSignUp.append("PinCodeId", Number(formData.pincode));
            formDataSignUp.append(
                "TermsConditionsAccepted",
                formData.termsAndCondition
            );
            console.log(formDataSignUp);
            axios
                .post(API_ROUTES.signup, formDataSignUp)
                .then((res) => {
                    if (res?.data?.IsSuccess) {
                        toast.success(res?.data?.Message);
                        dispatch(SignUpAction("signin"));
                    } else {
                        toast.error("Server Message : " + res?.data?.Message);
                    }
                })
                .catch((err) => {
                    toast.error("An error occurred while submitting the form.");
                });
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber" && value.length > 10) {
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "state") {
            // Make API call based on selected state ID
            axios
                .get(`${MasterApi.CITY}?StateId=${value}`)
                .then((response) => {
                    if (response?.data?.IsSuccess) {
                        setCity(response?.data?.Data);
                        setArea([]);
                        setPincode([]);
                    }
                })
                .catch((error) => {
                    // Handle any errors that occurred during the API call for state
                    toast.error("Something went wrong");
                });
        } else if (name === "city") {
            // Make API call based on selected city ID
            axios
                .get(`${MasterApi.AREA}?CityId=${value}`)
                .then((response) => {
                    if (response?.data?.IsSuccess) {
                        setArea(response?.data?.Data);
                    }
                })
                .catch((error) => {
                    // Handle any errors that occurred during the API call for state
                });
            axios
                .get(`${MasterApi.PINCODE}?CityId=${value}`)
                .then((response) => {
                    if (response?.data?.IsSuccess) {
                        setPincode(response?.data?.Data);
                    }
                })
                .catch((error) => {});
        }
    };

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(MasterApi.STATE);
                setState(response.data?.Data);
            } catch (error) {}
        };

        fetchData();

        // Return a cleanup function to be executed when the component unmounts or when the dependency changes
        return () => {
            // Perform cleanup operations here
            // This function will run before the effect runs again or when the component unmounts
        };
    }, []);

    return (
        <>
            <div className="signup-container">
                <button
                    onClick={() => dispatch(SignUpAction(""))}
                    className="pop-close"
                >
                    &times;
                </button>
                <div className="signup-card">
                    <div className="s-c-header">
                        <div>
                            <h1>Sign Up</h1>
                        </div>
                        <img src={icons.LOGO} alt="" />
                    </div>
                    <div className="s-c-form">
                        <form onSubmit={handleFormSubmit}>
                            {/* First + Last Name */}
                            <div className="form-row">
                                <div className="form-input">
                                    <label htmlFor="fname">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        className="fname"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-input">
                                    <label htmlFor="lname">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        className="lname"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Email + Phone */}
                            <div className="form-row">
                                <div className="form-input">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-input">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        placeholder="Enter mobile number"
                                        className="phone"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        pattern="[0-9]{10}"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="form-row">
                                <div className="form-input">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="address"
                                        placeholder="Enter address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* State + City */}
                            <div className="form-row">
                                <div className="form-input">
                                    <label htmlFor="state">State</label>
                                    <select
                                        name="state"
                                        onChange={handleInputChange}
                                        defaultValue={formData.state}
                                    >
                                        <option value={-1}>Select</option>
                                        {state &&
                                            state.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="form-input">
                                    <label htmlFor="city">City</label>
                                    <select
                                        name="city"
                                        onChange={handleInputChange}
                                        defaultValue={formData.state}
                                        disabled={
                                            !city.length || formData.state == -1
                                        }
                                    >
                                        <option value={1}>Select</option>
                                        {city &&
                                            city.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Pincode + Area Code */}
                            <div className="form-row">
                                <div className="form-input">
                                    <label htmlFor="pincode">Pin Code</label>
                                    <select
                                        name="pincode"
                                        onChange={handleInputChange}
                                        defaultValue={formData.state}
                                        disabled={!pincode.length}
                                    >
                                        <option value={1}>Select</option>
                                        {pincode &&
                                            pincode.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="form-input">
                                    <label htmlFor="area">Area Code </label>
                                    <select
                                        name="area"
                                        onChange={handleInputChange}
                                        defaultValue={formData.state}
                                        disabled={!area.length}
                                    >
                                        <option value={1}>Select</option>
                                        {area &&
                                            area.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Terms & Condition */}
                            <div className="form-row">
                                <input
                                    type="checkbox"
                                    name="termsAndCondition"
                                    id="term-and-condition"
                                    checked={termsAccepted}
                                    onChange={(event) => {
                                        setTermsAccepted(event.target.checked);
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            termsAndCondition:
                                                event.target.checked,
                                        }));
                                    }}
                                    // onChange={(event) =>
                                    //     setTermsAccepted(event.target.checked)
                                    // }
                                />
                                <label htmlFor="term-and-condition">
                                    {" "}
                                    <a> Accept All the terms and conditions</a>
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="form-row">
                                <button className="btn active" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <img src={auth.signup} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;

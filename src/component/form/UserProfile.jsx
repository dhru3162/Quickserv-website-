import React, { useEffect, useState } from 'react';
import "../../css/form/user-profile.css";
import create from "../../icons/request-status/create-1.png";
import assets from '../../static/assets/assets';
import { toast } from 'react-toastify';
import API_ROUTES, { getHeader } from '../../api/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';
const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state?.user);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        Address: "",
        AreaId: "",
        CityId: "",
        Email: "",
        FirstName: "",
        LastName: "",
        Mobile: "",
        PinCodeId: "",
        StateId: "",
    });
    const handleProfile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfile(e.target.files[0]);
        }
    };
    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        // Handle other input fields
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };

    const handleSubmit = () => {
        const formDataObj = new FormData();

        // ProfilePicture
        if (!profile) {
            toast.error('Profile picture file is required.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('ProfilePicture', profile, 'profile-picture.png');

        // Validate and append the request data to the FormData object
        if (!formData?.FirstName || !/^[a-zA-Z]+$/.test(formData?.FirstName)) {
            setIsPopupOpen(false)
            toast.error('Invalid first name.');
            return;
        }
        formDataObj.append('FirstName', formData?.FirstName);

        if (!formData?.LastName || !/^[a-zA-Z]+$/.test(formData?.LastName)) {
            setIsPopupOpen(false)
            toast.error('Invalid last name.');
            return;
        }
        formDataObj.append('LastName', formData?.LastName);

        if (!formData?.Email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(formData?.Email)) {
            setIsPopupOpen(false)
            toast.error('Invalid email address.');
            return;
        }
        formDataObj.append('Email', formData?.Email);

        if (!formData?.Mobile || !/^\d{10}$/.test(formData?.Mobile)) {
            toast.error('Invalid mobile number.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('Mobile', formData?.Mobile);

        if (!formData?.Address) {
            toast.error('Address is required.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('Address', formData?.Address);

        if (!formData?.StateId) {
            toast.error('State ID is required.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('StateId', formData?.StateId);

        if (!formData?.CityId) {
            toast.error('City ID is required.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('CityId', formData?.CityId);

        if (!formData?.AreaId) {
            toast.error('Area ID is required.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('AreaId', formData?.AreaId);

        if (!formData?.PinCodeId) {
            toast.error('Pin Code ID is required.');
            setIsPopupOpen(false)
            return;
        }
        formDataObj.append('PinCodeId', formData?.PinCodeId);
        // If the form data is valid, make the API call
        axios.post(API_ROUTES.SaveCustomerDetails, formDataObj, getHeader())
            .then(response => {
                // Handle the successful response
                console.log('Response:', response.data);
                if (response?.data?.Message) {
                    console.log(setIsPopupOpen(false));
                    toast.success(response?.data?.Message);
                }
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Error:', error.response.status);
                    console.log('Response data:', error.response.data);
                    console.log('Response headers:', error.response.headers);
                }
            })
            .finally(f => {
                setIsPopupOpen(false)
            });
    };

    const handleUpdateClick = (e) => {
        e.preventDefault();
        setIsPopupOpen(true);
    };

    useEffect(() => {
        axios.post(API_ROUTES.GetCustomerProfileDetails, {}, getHeader())
            .then(response => {
                if (response?.data?.IsSuccess) {
                    const { AreaId, CityId, Address, FirstName, LastName, Mobile, PinCodeId, StateId, Email } = response?.data?.Data;
                    setFormData({
                        ...formData,
                        AreaId,
                        CityId,
                        Address,
                        FirstName,
                        LastName,
                        Mobile,
                        PinCodeId,
                        StateId,
                        Email
                    });
                }
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with an error status code
                    const errorMessage = error.response.data.Message;
                    toast.error(errorMessage);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error('An error occurred while making the request.');
                }
            });
    }, []);

    return (
        <>
            {isPopupOpen && <Alert onConfirm={handleSubmit} setIsPopupOpen={setIsPopupOpen} />}
            <span className='form-heading'>Profile</span>
            <form className='user-form user-profile-form' onSubmit={handleUpdateClick}>
                <div className="user-profile-right">
                    <div className="user-profile-picture">
                        <img src={create} alt="" className='profile-edit' />
                        {profile ? (
                            <img
                                src={URL.createObjectURL(profile)}
                                alt="Profile"
                                className='profile-picture'
                            />
                        ) : (
                            <img src={assets.PROFILE} alt="" className='profile-picture' />
                        )}
                        <input onChange={handleProfile} type="file" name='ProfilePicture' />
                    </div>
                </div>
                <div className="user-profile-left">
                    <div className="form-row">
                        <div className="form-input">
                            <label htmlFor="fname">First Name</label>
                            <input
                                type="text"
                                name="FirstName"
                                className="fname"
                                value={formData.FirstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="lname">Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                className="lname"
                                value={formData.LastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <label htmlFor="phone">Email</label>
                            <input
                                type="email"
                                name="Email"
                                className="email"
                                value={formData.Email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="phone">Contact</label>
                            <input
                                type="tel"
                                name="Mobile"
                                className="phone"
                                value={formData.Mobile}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="form-input">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="Address"
                                className="address"
                                value={formData.Address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <label htmlFor="state">State</label>
                            <select
                                name="StateId"
                                className="state"
                                value={formData.StateId}
                                onChange={handleInputChange}
                            >
                                <option value={1}>Gujarat</option>
                                <option value="gujarat">Gujarat</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="city">City</label>
                            <select
                                name="CityId"
                                className="city"
                                value={formData.CityId}
                                onChange={handleInputChange}
                            >
                                <option value="">Select City</option>
                                <option value={1}>Rajkot</option>
                            </select>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-input">
                            <label htmlFor="AreaId">Area </label>
                            <select
                                name="AreaId"
                                className="city"
                                value={formData.AreaId}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Area</option>
                                <option value={1}>Rajkot</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="Pincode">Pincode</label>
                            <select
                                name="PinCodeId"
                                className="Pincode"
                                value={formData.PinCodeId}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Pincode</option>
                                <option value={1}>342432</option>
                            </select>
                        </div>
                    </div> */}
                </div>

                <button className="btn active" type='submit'>Update</button>

            </form>
        </>
    );
};

export default UserProfile;


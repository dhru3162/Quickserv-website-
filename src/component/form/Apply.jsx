import React, { useEffect, useState } from 'react'
import icons from '../../icons/icon';
import { MasterApi, getHeader } from '../../api/api';
import axios from 'axios';

const Apply = () => {
    const [apiData, setApiData] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        position: '',
        experience: '',
        gender: '',
        branch: '',
        noticePeriod: '',
        location: '',
        file: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            file: file,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Perform any necessary form validation here

        // Send the form data to the server or perform any desired action
        console.log(formData);

        // Reset the form after submission (if needed)
        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
            position: '',
            experience: '',
            gender: '',
            branch: '',
            noticePeriod: '',
            location: '',
            file: null,
        });
    };
    useEffect(() => {
        axios.get(`${MasterApi.BRANCH_LIST}`, getHeader())
            .then((response) => {

                if (response?.data?.IsSuccess) {
                    setApiData({ ...apiData, branch: response?.data?.Data })
                }

            })
            .catch((error) => {
                // Handle any errors that occurred during the API call for state
            });

    }, [])
    return (
        <>
            <span className='form-heading'>Apply</span>
            <form className='apply' onSubmit={handleFormSubmit}>

                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="fname"
                            placeholder='Enter first name'
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder='Enter last name'
                            className="lname"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder='Enter Address..'
                            className="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="phone">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="email"
                            placeholder='Enter email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="phone">Contact</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder='Enter number'
                            className="phone"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="address">Select Position</label>
                        <input
                            type="text"
                            name="position"
                            className="address"
                            value={formData.position}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="address">Yr of Experience</label>
                        <input
                            type="text"
                            name="experience"
                            className="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            className="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="form-input">
                        <label htmlFor="branch">Branch</label>
                        <select
                            name="branch"
                            className="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                        >
                            <option value="">Select</option>
                            {
                                apiData?.branch && apiData?.branch.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                            }

                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <label htmlFor="noticePeriod">Notice Period</label>
                        <select
                            name="noticePeriod"
                            className="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Notice Period</option>
                            <option value="1">1 month</option>
                            <option value="2">2 months</option>
                            <option value="3">3 months</option>
                        </select>
                    </div>
                    <div className="form-input">
                        <label htmlFor="location">Location applying for</label>
                        <select
                            name="location"
                            className="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Location</option>
                            <option value="Location1">Location 1</option>
                            <option value="Location2">Location 2</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-input">
                        <img src={icons.coud_upload} alt="" />
                    </div>
                    <div className='apply-file-input'>
                        <input type="file" id="issueSnaps" />
                        <span>
                            <span>Choose File</span>
                            <span>Note : Formate JPG & PDF</span>
                        </span>
                    </div>
                </div>
                <div className="form-row">
                    <button className="btn active" type="submit">Apply</button>
                </div>
            </form>

        </>
    )
}

export default Apply
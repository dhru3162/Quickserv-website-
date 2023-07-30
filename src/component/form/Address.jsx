import React, { useEffect, useState } from 'react';
import "../../css/form/address.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AddressAction } from '../../redux/action/userAction';
import { MasterApi, getHeader } from '../../api/api';
import axios from 'axios';
const Address = () => {
    const dispatch = useDispatch();
    const { address } = useSelector(state => state?.user);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [area, setArea] = useState([]);
    const [pincode, setPincode] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
        area: '',
        typeOfAddress: 'Home'
    });
    const [exapandForm, setExpandForm] = useState(true)
    const saveData = () => {
        // Validate form data
        if (!formData.fullName || formData.fullName.trim() === '') {
            toast.error('Full name is required.');
            return;
        }
        else if (!formData.address || formData.address.trim() === '') {
            toast.error('Address is required.');
            return;
        }
        else if (!formData.pincode) {
            toast.error('Pincode is required.');
            return;
        }
        else if (!formData.state) {
            toast.error('State is required.');
            return;
        }
        else if (!formData.city) {
            toast.error('City is required.');
            return;
        }

        else if (!formData.area) {
            toast.error('Area is required.');
            return;
        }

        else {

            if (selectedAddress === null) {
                console.log(formData)
                dispatch(AddressAction([...address, formData]))
            } else {

                const newData = [...address];
                newData[selectedAddress] = formData;
                dispatch(AddressAction(newData));
                setSelectedAddress(null);
            }
            // close the form
            setExpandForm(false)
            // Reset form data

            setFormData({
                fullName: '',
                mobileNumber: '',
                address: '',
                state: '',
                city: '',
                pincode: '',
                area: '',
                typeOfAddress: ''
            });
        }

    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber" && (value.length > 10)) {
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'state') {
            // Make API call based on selected state ID
            axios.get(`${MasterApi.CITY}?StateId=${value}`)
                .then((response) => {

                    if (response?.data?.IsSuccess) {
                        setCity(response?.data?.Data)
                        setArea([]);
                        setPincode([]);
                    }
                })
                .catch((error) => {
                    // Handle any errors that occurred during the API call for state
                    toast.error("Something went wrong")
                });
        } else if (name === 'city') {
            // Make API call based on selected city ID
            if (!formData?.state) {
                toast.error("Select state first to select city")
            }
            axios.get(`${MasterApi.AREA}?CityId=${value}`)
                .then((response) => {
                    console.log(response, "area")
                    if (response?.data?.IsSuccess) {
                        setArea(response?.data?.Data)
                    }

                })
                .catch((error) => {
                    // Handle any errors that occurred during the API call for state
                });
            axios.get(`${MasterApi.PINCODE}?CityId=${value}`)
                .then((response) => {
                    console.log(response, "Pincode")
                    if (response?.data?.IsSuccess) {
                        setPincode(response?.data?.Data);

                    }
                })
                .catch((error) => {

                });
        }
    };

    const handleAddressSelection = (addressIndex, flag) => {
        if (flag) {
            setExpandForm(true)
        }
        setSelectedAddress(addressIndex);
        setFormData(address[addressIndex]);
    };
    const handleAddressRemoval = (addressIndex) => {
        let newAddress = [...address];
        newAddress.splice(1, addressIndex);
        dispatch(AddressAction(newAddress))
        if (selectedAddress === addressIndex) {
            setSelectedAddress(null);
            setFormData({
                fullName: '',
                address: '',
                state: '',
                city: '',
                pincode: '',
                area: '',
                typeOfAddress: ''
            });
        }
    };
    // Api call for addresses
    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(MasterApi.STATE);
                setState(response.data?.Data);

            } catch (error) {
                // Handle error
                console.error('Error fetching data:', error);
            }
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
            <span className='form-heading'>Address</span>
            <div className="sell-form">
                <div>
                    {!exapandForm ? <button className='add-new-address btn active' onClick={() => setExpandForm(true)}>Add New Address</button> :
                        <div className="form-expantion">
                            <div className="form-exp-heading" >
                                <span>Address</span>
                                {
                                    false ? <button className='address-save-btn btn active' >Edit</button> : <button className='address-save-btn btn active' onClick={saveData}>Save</button>
                                }
                            </div>
                            <div className="expanded-form">
                                <div className="expanded-input">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input name='fullName' onChange={handleInputChange} type="text" placeholder='First name' value={formData.fullName} />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="mobileNumber">Phone</label>
                                    <input name='mobileNumber' onChange={handleInputChange} type="text" placeholder="Last name" value={formData.mobileNumber} />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="address">Address</label>
                                    <input name='address' onChange={handleInputChange} placeholder='Enter' type="text" value={formData.address} />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="state">State</label>
                                    <select name='state' onChange={handleInputChange} id="state" value={formData.state}>
                                        <option value="">Select State</option>
                                        {
                                            state && state.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="city">City</label>
                                    <select name='city' onChange={handleInputChange} id="city" value={formData.city}>
                                        <option value="">Select</option>
                                        {
                                            city && city.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="pincode">Pincode</label>
                                    <select name='pincode' onChange={handleInputChange} id="pincode" value={formData.pincode}>
                                        <option value="">Select</option>
                                        {
                                            pincode && pincode.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="area">Area</label>
                                    <select name='area' id="area" value={formData.area}>
                                        <option value="">Select</option>
                                        {
                                            area && area.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="typeOfAddress">Type of address</label>

                                    <div className='address-radio-btn'>
                                        <span className={`address-save-btn btn ${formData?.typeOfAddress === "Home" && "active"}`} onClick={() => setFormData({ ...formData, typeOfAddress: "Home" })}>Home</span>
                                        <span className={`address-save-btn btn ${formData?.typeOfAddress === "Work" && "active"}`} onClick={() => setFormData({ ...formData, typeOfAddress: "Work" })}>Work</span>
                                        <span className={`address-save-btn btn ${formData?.typeOfAddress === "Other" && "active"}`} onClick={() => setFormData({ ...formData, typeOfAddress: "Other" })}>Other</span>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    {address?.length > 0 && (
                        <div className="address card-wrapper">
                            {address.map((item, index) => (
                                <div
                                    key={index}
                                    className={`address-card ${selectedAddress === index ? 'selected' : ''}`}

                                >
                                    <span className='default-address'> Default</span>
                                    <div className="address-details">
                                        <strong>{item.FullName}</strong>
                                        <p>{item.Address}</p>
                                        <p> {item.StateId} ,{item.CityId} {item.AreaId} , {item.PinCodeId} </p>
                                        <p>Phone : {item?.Mobile}</p>
                                        <p>At : {item?.typeOfAddress}</p>
                                    </div>
                                    <div className="address-actions">
                                        <button
                                            className="edit-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddressSelection(index, "edit");
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button

                                            onClick={(e) => {

                                                handleAddressRemoval(index);
                                            }}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => handleAddressSelection(index)}
                                        >
                                            Set as default
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};
export default Address;
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API_ROUTES, { MasterApi, getHeader } from '../../api/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FormPopUpAction, LoaderAction } from '../../redux/action/TogfleAction';
const BookService = () => {
    const dispatch = useDispatch();
    const { user, address, } = useSelector(state => state?.user);
    const [productType, setProductType] = useState([])
    const [productMake, setProductMake] = useState([])
    const [productModel, setProductModel] = useState([])
    const [productIssue, setProductIssue] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(address.length > 0 ? address[0] : {});
    const [index, setIndex] = useState(0);
    const [expanded, setExpanded] = useState({
        customer: true,
        address: false,
        product: false,
    });

    const handleAddressSelection = (addressIndex) => {
        setIndex(addressIndex);
        setSelectedAddress(address[index]);
    };

    const [formData, setFormData] = useState({
        name: selectedAddress?.FullName,
        phone: selectedAddress?.Mobile,
        email: selectedAddress?.Email,
        make: '',
        model: '',
        productNumber: '',
        serialNumber: '',
        issueDescription: '',
        comment: '',
        issueSnaps: null
    });
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        try {
            if (name === 'productType') {
                // Make API call based on selected state ID
                dispatch(LoaderAction(true))
                const response = await axios.get(`${MasterApi.PROD_MAKE}?ProductTypeId=${value}`, getHeader());
                if (response?.data?.IsSuccess) {
                    setProductMake(response?.data?.Data)
                    setProductModel([]);
                }
                dispatch(LoaderAction(false))
                return;
            }

            if (name === 'make') {
                // Make API calls based on selected city ID
                dispatch(LoaderAction(true))
                const prodModelResponse = await axios.get(`${MasterApi.PROD_MODEL}?ProductMakeId=${value}`, getHeader())
                if (prodModelResponse?.data?.IsSuccess) {
                    setProductModel(prodModelResponse?.data?.Data);
                }
                dispatch(LoaderAction(false))
            }
        } catch (error) {
            // Handle any errors that occurred during the API calls
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(`${MasterApi.PROD_TYPE}`, getHeader());
            if (response1?.data?.IsSuccess) {
                setProductType(response1?.data?.Data)
            }
        }
        getData();
        return () => {
        }
        

    }, []
    )
    useEffect(() => {
        const header = getHeader();
        axios.post(`${MasterApi.ISSUE_DESC}`, null, header)
            .then((response) => {
                console.log(response)
                if (response?.data?.IsSuccess) {
                    setProductIssue(response?.data?.Data);
                }
                console.log(productIssue)
            })
            .catch((error) => {
                console.log("An error occurred while fetching data:", error);
            });
        return () => {
        }

    }, []);



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedFormats = /(png|jpg|jpeg)$/;
        const fileName = file.name;
        if (!allowedFormats.test(fileName)) {
            // Invalid file format
            toast.error(`Invalid file format: ${fileName}`);
            // Perform error handling or show an error message
            return;
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            issueSnaps: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("To book a service, you need to log in");
            return;
        }

        const { Address, CityId, StateId, AreaId, PinCodeId, Id } = selectedAddress;

        // Perform error validation
        if (!AreaId || !Address || !StateId || !CityId || !PinCodeId || !formData.model || !formData.productNumber || !formData.serialNumber || !formData.issueDescription) {
            toast.error("Please fill in all required fields");
            return;
        } else if (address?.length < 0) {
            toast.error("Please Select Address");
            return;
        }
        dispatch(LoaderAction(true))
        const formDataObj = new FormData();

        formDataObj.append('Id', 0);
        formDataObj.append('CustomerId', user?.Id);
        formDataObj.append('ServiceAddress', Address);
        formDataObj.append('ServiceStateId', CityId);
        formDataObj.append('ServiceCityId', StateId);
        formDataObj.append('ServiceAreaId', AreaId);
        formDataObj.append('ServicePincodeId', PinCodeId);
        formDataObj.append('ProductModelId', formData.model);
        formDataObj.append('ProductNumber', formData.productNumber);
        formDataObj.append('ProductSerialNo', formData.serialNumber);
        formDataObj.append('IssueDescId', formData.issueDescription);
        formDataObj.append('Comment', formData.comment);
        formDataObj.append('IssuePhoto', formData.issueSnaps);

        try {

            const response = await axios.post(API_ROUTES.BookService, formDataObj, getHeader());
            if (response?.data?.IsSuccess) {
                toast.success(response?.data?.Message);
                setFormData({
                    type: '',
                    make: '',
                    model: '',
                    productNumber: '',
                    serialNumber: '',
                    issueDescription: '',
                    comment: '',
                    issueSnaps: null,
                });
            } else {
                toast.error(response?.data?.Message);
            }
        } catch (error) {
            toast.error("There was an issue while submitting the form");
        }
        finally {
            dispatch(LoaderAction(false))
        }
    };


    return (
        <>
            <span className="form-heading">Book Service</span>
            <form className="sell-form" onSubmit={handleSubmit}>
                <div>
                    <div className="form-expantion">
                        <div
                            className="form-exp-heading"
                            onClick={() => setExpanded({ ...expanded, customer: !expanded.customer })}
                        >
                            <span>Customer</span>
                            <strong>{expanded.customer ? '-' : '+'}</strong>
                        </div>

                        {expanded.customer && (
                            <div className="expanded-form">
                                <div className="expanded-input">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='Enter Name'
                                        value={formData.name}

                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="phone">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder='Enter  Mobile Number'
                                        value={formData.phone}

                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Enter email '
                                        value={formData.email}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="form-expantion">
                        <div className="form-exp-heading" onClick={() => setExpanded({ ...expanded, serviceAddress: !expanded.serviceAddress })}>
                            <span>Service Address</span>
                            <strong>{expanded.serviceAddress ? '-' : '+'}</strong>

                        </div>
                        {
                            expanded.serviceAddress && <div className="address card-wrapper forms">
                                <p className='add-address'>Add new address <button onClick={() => dispatch(FormPopUpAction("address"))} className='active'>+</button></p>
                                {
                                    address.map((item, idx) => {
                                        return <div
                                            key={idx}
                                            className={`address-card `}
                                        >
                                            <div className="address-details">
                                                <strong>{item?.FullName} </strong>
                                                <span>Phone : {item?.Mobile}</span>
                                                <span>At : {item?.typeOfAddress}</span>
                                            </div>
                                            <div className="address-details">
                                                <p>Rajkot, Gujarat</p>
                                                <p>Pincode:456545 {item.PinCodeId}, Area:545454 {item.AreaId}</p>
                                            </div>
                                            <div className="address-actions">
                                                <span className={idx === index ? "active btn" : "btn"} onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleAddressSelection(idx)
                                                }}>
                                                    {idx === index ? "Selected" : "select  "}
                                                </span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className="form-expantion">
                        <div
                            className="form-exp-heading"
                            onClick={() => setExpanded({ ...expanded, product: !expanded.product })}
                        >
                            <span>Product Details</span>
                            <strong>{expanded.product ? '-' : '+'}</strong>
                        </div>
                        {expanded.product && (
                            <div className="expanded-form">
                                <div className="expanded-input">
                                    <label htmlFor="type">Product Type</label>
                                    <select
                                        id="type"
                                        name="productType"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                    >

                                        <option value={1}>Select</option>
                                        {
                                            productType && productType.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="make">Product Make</label>
                                    <select
                                        id="make"
                                        name="make"
                                        value={formData.make}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>

                                        {
                                            productMake.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="model">Product Model</label>

                                    <select
                                        id="model"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>

                                        {
                                            productModel && productModel.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="number">Product Number</label>
                                    <input
                                        type="text"
                                        id="number"
                                        name="productNumber"
                                        placeholder='Enter product Number'
                                        value={formData.productNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="serialNumber">Product Serial Number</label>
                                    <input
                                        type="text"
                                        id="serialNumber"
                                        name="serialNumber"
                                        placeholder='Enter serial number'
                                        value={formData.serialNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="issueDescription">Issue Description</label>
                                    <select
                                        id="issueDescription"
                                        name="issueDescription"
                                        value={formData.issueDescription}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        {
                                            productIssue && productIssue.map((st, i) => <option key={i} value={st?.Id}>{st?.IssueDescriptionName}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="comment">Comment</label>
                                    <input
                                        type="text"
                                        id="comment"
                                        name="comment"
                                        placeholder='Write...'
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="issueSnaps">Issue Snaps</label>
                                    <div className="service-file-input">
                                        <input
                                            type="file"
                                            id="issueSnaps"
                                            name="issueSnaps"
                                            accept="image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                        <span>
                                            <span>Choose File</span>
                                            <span>Note: Format JPG & PDF</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button className="btn active" type="submit">Submit</button>
            </form>

        </>
    );
};

export default BookService;

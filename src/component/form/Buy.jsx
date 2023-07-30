import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API_ROUTES, { MasterApi, getHeader } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormPopUpAction, LoaderAction } from '../../redux/action/TogfleAction';

const Buy = () => {
    const dispatch = useDispatch()
    const { user, address } = useSelector(state => state?.user);
    const [paymentTerm, setPaymentTerm] = useState([])
    const [productType, setProductType] = useState([])
    const [productMake, setProductMake] = useState([])
    const [productModel, setProductModel] = useState([])
    const [productDescription, setProductDescription] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(address.length > 0 ? address[0] : {});
    const [index, setIndex] = useState(0);
    const [extendWarrentyData, setExtendWarrentyData] = useState({});
    const [expanded, setExpanded] = useState({
        customer: true,
        serviceAddress: false,
        product: false
    });
    const [formData, setFormData] = useState({
        name: selectedAddress?.FullName,
        phone: selectedAddress?.Mobile,
        email: selectedAddress?.Email,
        alternatePhone: '',
        paymentTerm: "",
        gst: '',
        productType: '',
        productMake: '',
        productModel: '',
        productSerialNumber: '',
        quantity: '',
        description: '',
        productCondition: '',
        comment: ''
    });
    const handleAddressSelection = (addressIndex) => {
        setIndex(addressIndex);
        setSelectedAddress(address[index]);
    };
    const saveData = (flag) => {
        if (flag == "prod") {
            let { productType, productMake, productModel, productSerialNumber, quantity, description, comment, productCondition } = formData
            const obj = {
                productType,
                productMake,
                productModel,

                quantity,
                description,
                comment,
            }
            for (const key in obj) {
                if (!obj[key]) {
                    toast.error("Please feel all the product details");
                    return
                }
            }
            if (extendWarrentyData.product) {
                setExtendWarrentyData({
                    ...extendWarrentyData, product: [...extendWarrentyData.product, obj]
                })
            }
            else setExtendWarrentyData({
                ...extendWarrentyData, product: [obj]
            })
        }

    };
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name === "alternatePhone" && (value.length > 10)) {
            return;
        }
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

                return;
            }

            if (name === 'productMake') {
                // Make API calls based on selected city ID
                dispatch(LoaderAction(true))
                const prodModelResponse = await axios.get(`${MasterApi.PROD_MODEL}?ProductMakeId=${value}`, getHeader())
                if (prodModelResponse?.data?.IsSuccess) {
                    setProductModel(prodModelResponse?.data?.Data);
                }

            }
        } catch (error) {
            // Handle any errors that occurred during the API calls
            toast.error("Something went wrong");
        }
        finally {
            dispatch(LoaderAction(false))
        }

    };
    const handleSubmit = () => {
        const { Address, CityId, StateId, AreaId, PinCodeId, Id } = selectedAddress
        const obj = {
            Id: 0,
            CustomerId: user?.Id,
            AlternateMobileNo: formData.alternatePhone,
            CustomerGstNo: formData.gst,
            Address,
            StateId,
            CityId,
            AreaId,
            PinCodeId,
            PaymentTermId: formData.paymentTerm,
            EnquiryComment: formData.comment,
            EnquiryStatusId: 0,
            IsActive: true,
            CreatedBy: 0,
            CreatedDate: new Date().toISOString(),
            ModifiedBy: 0,
            ModifiedDate: new Date().toISOString(),
            Products: extendWarrentyData?.product ? extendWarrentyData?.product?.map(item => {
                return {
                    Id: 0,
                    SOEnquiryId: 0,
                    Price: 0,
                    IsDeleted: true,
                    ProductModelId: item.productModel,
                    ProdDescId: item?.description,
                    ProductSerialNo: "default",
                    ProductConditionId: 0,
                    Quantity: item?.quantity,
                    Comment: item?.comment
                }
            }) : [
                {
                    Id: 0,
                    SOEnquiryId: 0,
                    Price: 0,
                    IsDeleted: true,
                    ProductModelId: formData.productModel,
                    ProdDescId: formData?.description,
                    ProductSerialNo: "default",
                    ProductConditionId: 0,
                    Quantity: formData?.quantity,
                    Comment: formData?.comment
                }
            ]
        };
        // Step 1: Form validation
        let errors = {}; // Object to store validation errors
        // Validate CustomerId
        if (!obj.CustomerId) {
            errors.CustomerId = "Customer ID is required.";
        }

        // Validate AlternateMobileNo
        if (!obj.AlternateMobileNo && obj.AlternateMobileNo === 10) {
            errors.AlternateMobileNo = "Alternate Mobile No is required.";
        }

        // Validate CustomerGstNo
        if (!obj.CustomerGstNo) {
            errors.CustomerGstNo = "Customer GST No is required.";
        }

        // Validate Address
        if (!obj.Address) {
            errors.Address = "Address is required.";
        }

        // Validate StateId
        if (!obj.StateId) {
            errors.StateId = "State is required.";
        }

        // Validate CityId
        if (!obj.CityId) {
            errors.CityId = "City is required.";
        }

        // Validate AreaId
        if (!obj.AreaId) {
            errors.AreaId = "Area is required.";
        }

        // Validate PincodeId
        if (!obj.PinCodeId) {
            errors.PincodeId = "Pincode is required.";
        }

        // Validate PaymentTermId
        if (!obj.PaymentTermId) {
            errors.PaymentTermId = "Payment Term is required.";
        }

        // Validate EnquiryComment
        if (!obj.EnquiryComment) {
            errors.EnquiryComment = "Enquiry Comment is required.";
        }

        // Validate Products
        if (!obj.Products || obj.Products.length === 0) {
            errors.Products = "At least one product is required.";
        } else {
            // Validate each product in the Products array
            obj.Products.forEach((product, index) => {
                if (!product.ProductModelId) {
                    errors.Products = `Product ${index + 1}: Product Model is required.`;
                }

                if (!product.ProdDescId) {
                    errors.Products = `Product ${index + 1}: Product Description is required.`;
                }

                if (!product.Quantity) {
                    errors.Products = `Product ${index + 1}: Quantity is required.`;
                }
            });
        }
        // Check if there are any validation errors
        if (Object.keys(errors).length > 0) {
            // Display the first validation error using React Toastify
            const firstError = Object.values(errors)[0];
            toast.error(firstError);
            return; // Exit early if there are validation errors
        }

        // Step 2: Make Axios request
        dispatch(LoaderAction(true))
        axios
            .post(API_ROUTES.Buy, obj, getHeader())
            .then((response) => {
                // Handle successful response
                if (response.data.IsSuccess) {
                    toast.success(response.data.Message);

                }
                else {
                    toast.error(response.data.Message)
                }
            })
            .catch((error) => {
                // Handle error response
                toast.error("An error occurred. Please try again.");
            })
            .finally(f => {

                dispatch(LoaderAction(false))
            })
    }
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

    }, [])
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(`${MasterApi.PAYMENT_TERM}`, getHeader());
            if (response1?.data?.IsSuccess) {
                setPaymentTerm(response1?.data?.Data)
            }
        }
        getData();
        return () => {
        }

    }, [])
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.post(`${MasterApi.PROD_DESC}`, null, getHeader());
            console.log(response1)
            if (response1?.data?.IsSuccess) {
                setProductDescription(response1?.data?.Data)
            }
        }
        getData();
        return () => {
        }

    }, [productType])


    return (
        <>
            <span className='form-heading'>Buy</span>
            <div className="sell-form">
                <div>
                    <div className="form-expantion">
                        <div className="form-exp-heading" onClick={() => setExpanded({ ...expanded, customer: !expanded.customer })}>
                            <span>Customer</span>
                            <strong>{expanded.customer ? '-' : '+'}</strong>
                        </div>
                        {expanded.customer && (
                            <div className="expanded-form">
                                <div className="expanded-input">
                                    <label htmlFor="name">Name</label>
                                    <input value={formData.name} name='name' type="text" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="mobile">Mobile Number</label>
                                    <input value={formData.phone} name='phone' type="text" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="email">Email</label>
                                    <input value={formData.email} name='email' type="email" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="text">Alternate Number</label>
                                    <input onChange={handleInputChange} value={formData?.alternatePhone} name='alternatePhone' type="number" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="gst">Customer GST Number</label>

                                    <input onChange={handleInputChange} name='gst' type="text" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="payment">Payment Term</label>

                                    <select onChange={handleInputChange} name='paymentTerm' id="payment">

                                        <option value="">Select</option>
                                        {
                                            paymentTerm && paymentTerm.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
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
                        <div className="form-exp-heading" onClick={() => setExpanded({ ...expanded, product: !expanded.product })}>
                            <span>Product Detail</span>
                            <strong>{expanded.product ? '-' : '+'}</strong>
                        </div>
                        {expanded.product && (
                            <div className="expanded-form">
                                <button onClick={() => saveData("prod")} className='dynamicInput'>&#43;</button>
                                <div className="expanded-input">
                                    <label htmlFor="type">Product Type</label>
                                    <select onChange={handleInputChange} name='productType' id="type">

                                        <option value="">Select</option>
                                        {
                                            productType && productType.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="make">Product Make</label>
                                    <select onChange={handleInputChange} name='productMake' id="make">
                                        <option value="">Select</option>
                                        {
                                            productMake && productMake.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }

                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="model">Product Model</label>
                                    <select onChange={handleInputChange} name='productModel' id="model">
                                        <option value="">Select</option>
                                        {
                                            productModel && productModel.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="description">Product Description</label>
                                    <select onChange={handleInputChange} value={formData.productDescription} name='description' id="description">

                                        <option value={1}>Select</option>
                                        {
                                            productDescription && productDescription.map((st, i) => <option key={i} value={st?.Id}>{st?.ProductDescription}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input onChange={handleInputChange} placeholder='Enter Quality' name='quantity' type="number" id="quantity" />
                                </div>

                                <div className="expanded-input">
                                    <label htmlFor="comments">Customer Comment</label>
                                    <input onChange={handleInputChange} name='comment' placeholder='Enter' type="text" id="comment" />
                                </div>

                            </div>

                        )}
                        {
                            expanded.product && extendWarrentyData.product && <div class="table-wrapper">
                                <table class="input-data">
                                    <thead>
                                        <tr>
                                            <th>Product Type</th>
                                            <th>Product Make</th>
                                            <th>Product Model</th>
                                            <th>Quantity</th>
                                            <th>Description</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {extendWarrentyData.product.map((item) => (
                                            <tr key={item.productMake}>

                                                <td>{item.productType}</td>
                                                <td>{item.productMake}</td>
                                                <td>{item.productModel}</td>

                                                <td>{item.quantity}</td>

                                                <td>{item.description}</td>
                                                <td>{item.comment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn active">Submit</button>
            </div>
        </>
    )
}

export default Buy
import React, { useEffect, useRef, useState } from 'react'
import "../../css/form/address.css";
import { useDispatch, useSelector } from 'react-redux';
import { FormPopUpAction, LoaderAction } from '../../redux/action/TogfleAction';
import { toast } from 'react-toastify';
import API_ROUTES, { MasterApi, getHeader } from '../../api/api';
import axios from 'axios';
const ExtendWarrenty = () => {
    const dispatch = useDispatch();
    const { address, formMasterData } = useSelector(state => state?.user);
    const fileInputRef = useRef(null);
    const [extendWarrentyData, setExtendWarrentyData] = useState(null);
    const [paymentTerm, setPaymentTerm] = useState([])
    const [productType, setProductType] = useState([])
    const [productMake, setProductMake] = useState([])
    const [productWarrenty, setProductWarrenty] = useState([])
    const [productModel, setProductModel] = useState([])
    const [serviceList, setServiceList] = useState([])
    const [productCondition, setProductCondition] = useState([])

    const [filesUpload, setFilesUpload] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(address.length > 0 ? address[0] : {});
    const [index, setIndex] = useState(0);
    const handleAddressSelection = (addressIndex) => {
        setIndex(addressIndex);
        setSelectedAddress(address[index]);
    };
    const [expanded, setExpanded] = useState({
        customer: true,
        type: false,
        serviceAddress: false,
        product: false
    });
    const [formData, setFormData] = useState({
        name: selectedAddress.FullName,
        phone: selectedAddress.Mobile,
        email: selectedAddress?.Email,
        alternatePhone: '',
        gst: '',
        paymentType: '',

        serviceType: '',

        productType: '',
        productMake: '',
        productModel: '',
        productSerialNumber: '',
        productNumber: '',
        productWarrenty: '',
        productCondition: '',
    });
    const saveData = () => {
        let { productType, productMake, productModel, productSerialNumber, productNumber, productWarrenty, productCondition } = formData
        let obj = { productType, productMake, productModel, productSerialNumber, productNumber, productWarrenty, productCondition }
        for (let key in obj) {
            if (!obj[key]) {
                toast.error(`${key} is require`)
            }
        }
        if (extendWarrentyData) {
            setExtendWarrentyData([...extendWarrentyData, obj])
        }
        else setExtendWarrentyData([obj])
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

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const allowedFormats = /(pdf|png|jpg|jpeg)$/;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = file.name;

            if (!allowedFormats.test(fileName)) {
                // Invalid file format
                toast.error(`Invalid file format: ${fileName}`);
                // Perform error handling or show an error message
                return;
            }

            // File format is valid
            // Perform further processing with the file
            setFilesUpload([...filesUpload, file])
        }
    };

    const handleSubmit = () => {
        const { Address, CityId, StateId, AreaId, PinCodeId, Id } = selectedAddress
        // Create FormData instance
        const formDataObj = new FormData();
        const jsonData = {
            AlternetNumber: formData?.alternatePhone,
            CustomerGSTINNo: formData?.gst,
            PaymentTermId: formData?.paymentType,
            ServiceTypeId: formData.serviceType,
            ServiceAddresses: [
                {
                    Address,
                    StateId,
                    CityId,
                    AreaId,
                    PinCodeId,
                    IsDefault: true,
                },
            ],
            Products: !extendWarrentyData ? [] : extendWarrentyData?.map(item => {
                return {
                    ProductModelId: item?.productModel,
                    ProductSerialNo: item?.productSerialNumber,
                    ProductNumber: item?.productNumber,
                    WarrantyTypeId: item?.productWarrenty,
                    ProductConditionId: item?.productCondition,
                }
            })
        };
        formDataObj.append('parameters', JSON.stringify(jsonData));

        // Set file fields

        if (filesUpload.length != 0) {
            filesUpload.forEach((element, i) => {
                console.log(element)
                formDataObj.append(`PurchaseProofFile_${i}`, element)
            });
        }
        axios.post(API_ROUTES.SaveExtendedWarranty, formDataObj, getHeader())
            .then((response) => {
                console.log(response)
                // Handle successful response
                if (response.data.IsSuccess) {
                    toast.success(response.data.Message)
                }
                else {
                    toast.error(response.data.Message)
                }
            })
            .catch((error) => {
                // Handle error response
                toast.error("An error occurred. Please try again.");
            });
    }

    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(`${MasterApi.SERVICE_LIST}`, getHeader());
            if (response1?.data?.IsSuccess) {
                setServiceList(response1?.data?.Data)
            }
        }
        getData();
        return () => {
        }

    }, [])

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
            const response1 = await axios.get(`${MasterApi.PROD_CONDITION}`, getHeader());
            if (response1?.data?.IsSuccess) {
                setProductCondition(response1?.data?.Data)
            }
        }
        getData();
        return () => {
        }

    }, [])
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(`${MasterApi.WARRENTY_TYPE}`, getHeader());
            if (response1?.data?.IsSuccess) {
                setProductWarrenty(response1?.data?.Data)
            }
        }
        getData();
        return () => {
        }

    }, [])
    return (
        <>
            <span className='form-heading'>Extended warrenty</span>
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
                                    <input value={formData.email} name='email' placeholder='Enter' type="email" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="text">Alternate Number</label>
                                    <input onChange={handleInputChange} value={formData.alternatePhone} name='alternatePhone' placeholder='Enter' type="text" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="gst">Customer GST Number</label>

                                    <input onChange={handleInputChange} placeholder='Enter' name='gst' type="text" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="paymentType">Payment Term</label>

                                    <select onChange={handleInputChange} name='paymentType' id="paymentType">

                                        <option value="">Select</option>
                                        {
                                            paymentTerm.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }

                                    </select>
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="form-expantion">
                        <div className="form-exp-heading" onClick={() => setExpanded({ ...expanded, type: !expanded.type })}>
                            <span>Service Type</span>
                            <strong>{expanded.type ? '-' : '+'}</strong>
                        </div>
                        {expanded.type && (
                            <div className="expanded-form">

                                <div className="expanded-input">
                                    <label htmlFor="service_type">Service Type</label>

                                    <select onChange={handleInputChange} name='serviceType' id="service_type">
                                        <option value="">Select</option>
                                        {
                                            serviceList.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
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
                                            productType.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="make">Product Make</label>
                                    <select onChange={handleInputChange} name='productMake' id="make">

                                        <option value="">Select</option>
                                        {
                                            productMake.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="model">Product Model</label>
                                    <select onChange={handleInputChange} name='productModel' id="model">

                                        <option value="">Select</option>
                                        {
                                            productModel.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="serialNumber">Serial Number</label>
                                    <input onChange={handleInputChange} name='productSerialNumber' type="text" id="serialNumber" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="productNumber">Product Number</label>

                                    <input onChange={handleInputChange} name='productNumber' type="text" id="productNumber" />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="warrentyType">Warrenty type</label>
                                    <select onChange={handleInputChange} name='productWarrenty' id="warrenty">
                                        <option value="">Select</option>
                                        {
                                            productWarrenty.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }

                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="productcondition">Product Condition</label>
                                    <select onChange={handleInputChange} name='productCondition' id="productCondition">

                                        <option value="">Select</option>
                                        {
                                            productCondition.map((st, i) => <option key={i} value={st?.Value}>{st?.Text}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="condition">Prof of purchase</label>
                                    <div className='service-file-input'>
                                        <input type="file" id="issueSnaps" multiple ref={fileInputRef} onChange={handleFileUpload} />
                                        <span>
                                            <span>Choose File</span>
                                            <span>Note : Formate JPG & PDF</span>
                                        </span>
                                    </div>
                                </div>

                            </div>

                        )}
                        {
                            expanded.product && extendWarrentyData && <div class="table-wrapper">
                                <table class="input-data">
                                    <thead>
                                        <tr>
                                            <th>Product Type</th>
                                            <th>Product Make</th>
                                            <th>Product Model</th>
                                            <th>Serial Number</th>
                                            <th>Product Number</th>
                                            <th>Product Warrenty</th>
                                            <th>Product Condition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {extendWarrentyData?.map((item) => (
                                            <tr key={item.productNumber}>
                                                <td>{item.productType}</td>
                                                <td>{item.productMake}</td>
                                                <td>{item.productModel}</td>
                                                <td>{item.productSerialNumber}</td>
                                                <td>{item.productNumber}</td>
                                                <td>{item.productWarrenty}</td>
                                                <td>{item.productCondition}</td>
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

export default ExtendWarrenty
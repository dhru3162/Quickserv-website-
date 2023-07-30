import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormPopUpAction, LoaderAction } from "../../redux/action/TogfleAction";
import { toast } from "react-toastify";
import API_ROUTES, { MasterApi, getHeader } from "../../api/api";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const Sell = () => {
    const dispatch = useDispatch();
    const { address } = useSelector((state) => state?.user);
    const [sellData, setSellData] = useState(null);
    const [expanded, setExpanded] = useState({
        customer: true,
        service: false,
        product: false,
    });
    const [paymentTerm, setPaymentTerm] = useState([]);
    const [productType, setProductType] = useState([]);
    const [productMake, setProductMake] = useState([]);
    const [productModel, setProductModel] = useState([]);
    const [productCondition, setProductCondition] = useState([]);
    const [productDescription, setProductDescription] = useState([]);
    const [filesUpload, setFilesUpload] = useState({
        profOfPurchage: [],
        issueSnaps: [],
    });
    const [selectedAddress, setSelectedAddress] = useState(
        address.length > 0 ? address[0] : {}
    );
    const [index, setIndex] = useState(0);
    const handleAddressSelection = (addressIndex) => {
        setIndex(addressIndex);
        setSelectedAddress(address[index]);
    };
    const [formData, setFormData] = useState({
        name: selectedAddress.FullName,
        phone: selectedAddress.Mobile,
        email: selectedAddress?.Email,
        alternatePhone: "",
        gst: "",
        paymentType: "",
        productType: "",
        productMake: "",
        productModel: "",
        productCondition: "",
        productNumber: "",
        productSerialNumber: "",
        productDescription: "",
    });

    const initialValue = {
        name: selectedAddress.FullName,
        phone: selectedAddress.Mobile,
        email: selectedAddress?.Email,
        alternatePhone: "",
        gst: "",
        paymentType: "",
        productType: "",
        productMake: "",
        productModel: "",
        productCondition: "",
        productNumber: "",
        productSerialNumber: "",
        productDescription: "",
    };

    // const handleSubmit = (values) => {};
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { Address, CityId, StateId, AreaId, PinCodeId, Id } =
    //         selectedAddress;
    //     // Create FormData instance
    //     const formDataObj = new FormData();
    //     const jsonData = {
    //         AlternetNumber: formData?.alternatePhone,
    //         CustomerGSTINNo: formData?.gst,
    //         PaymentTermId: formData?.paymentType,
    //         ServiceAddresses: [
    //             {
    //                 Address,
    //                 StateId,
    //                 CityId,
    //                 AreaId,
    //                 PinCodeId,
    //                 IsDefault: true,
    //             },
    //         ],
    //         ProductDetails: !sellData
    //             ? [
    //                   {
    //                       ProdModelId: formData?.productModel,
    //                       ProdSerialNo: formData?.productSerialNumber,
    //                       ProdNumber: formData?.productNumber,
    //                       ProdDescId: formData?.productDescription,
    //                       ProdConditionId: formData?.productCondition,
    //                   },
    //               ]
    //             : sellData?.map((item) => {
    //                   return {
    //                       ProdModelId: item?.productModel,
    //                       ProdSerialNo: item?.productSerialNumber,
    //                       ProdNumber: item?.productNumber,
    //                       ProdDescId: item?.productDescription,
    //                       ProdConditionId: item?.productCondition,
    //                   };
    //               }),
    //     };
    //     formDataObj.append("parameters", JSON.stringify(jsonData));
    //     if (filesUpload?.profOfPurchage.length != 0) {
    //         filesUpload?.profOfPurchage.forEach((element, i) => {
    //             element.forEach((ele) => {
    //                 formDataObj.append(`PurchaseProofFile_${i}`, ele);
    //             });
    //         });
    //     }
    //     if (filesUpload?.issueSnaps.length != 0) {
    //         filesUpload.issueSnaps.forEach((element, i) => {
    //             element.forEach((ele) => {
    //                 formDataObj.append(`ProductSnaps_${i}`, ele);
    //             });
    //         });
    //     }
    //     for (const key of formDataObj.entries()) {
    //         console.log(key);
    //     }
    //     dispatch(LoaderAction(true));
    //     axios
    //         .post(API_ROUTES.SaveSellDetails, formDataObj, getHeader())
    //         .then((response) => {
    //             if (response.data.IsSuccess) {
    //                 toast.success(response.data.Message);
    //             } else {
    //                 toast.error(response.data.Message);
    //             }
    //         })
    //         .catch((error) => {
    //             // Handle error response
    //             toast.error("An error occurred. Please try again.");
    //         })
    //         .finally((f) => {
    //             dispatch(LoaderAction(false));
    //         });
    // };
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name was required"),
    });

    // const formik = useFormik({
    //     initialValues: initialValue,
    //     onSubmit: handleSubmit,
    //     validationSchema: validationSchema,
    // });

    const saveData = (e) => {
        e.preventDefault();
        let {
            productType,
            productMake,
            productModel,
            productSerialNumber,
            productDescription,
            productNumber,
            productCondition,
        } = formData;
        let obj = {
            productType,
            productMake,
            productModel,
            productSerialNumber,
            productNumber,
            productCondition,
            productDescription,
        };
        for (const key in obj) {
            if (!obj[key]) {
                toast.error(`${key} is required`);
                return;
            }
        }
        if (sellData) {
            setSellData([...sellData, obj]);
        } else setSellData([obj]);
        setFormData({
            ...formData,
            productType: "",
            productMake: "",
            productModel: "",
            productSerialNumber: "",
            productDescription: "",
            productNumber,
            productCondition,
        });
    };
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name === "alternatePhone" && value.length > 10) {
            return;
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        try {
            if (name === "productType") {
                // Make API call based on selected state ID
                dispatch(LoaderAction(true));
                const response = await axios.get(
                    `${MasterApi.PROD_MAKE}?ProductTypeId=${value}`,
                    getHeader()
                );
                if (response?.data?.IsSuccess) {
                    setProductMake(response?.data?.Data);
                    setProductModel([]);
                }

                return;
            }

            if (name === "productMake") {
                // Make API calls based on selected city ID
                dispatch(LoaderAction(true));
                const prodModelResponse = await axios.get(
                    `${MasterApi.PROD_MODEL}?ProductMakeId=${value}`,
                    getHeader()
                );
                if (prodModelResponse?.data?.IsSuccess) {
                    setProductModel(prodModelResponse?.data?.Data);
                }
            }
        } catch (error) {
            // Handle any errors that occurred during the API calls
            toast.error("Something went wrong");
        } finally {
            dispatch(LoaderAction(false));
        }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const { name } = event.target;
        if (name === "issueSnaps") {
            setFilesUpload({
                ...filesUpload,
                issueSnaps: [...filesUpload?.issueSnaps, files],
            });
        } else {
            setFilesUpload({
                ...filesUpload,
                profOfPurchage: [...filesUpload?.profOfPurchage, files],
            });
        }
    };
    // console.log(filesUpload);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { Address, CityId, StateId, AreaId, PinCodeId, Id } =
            selectedAddress;
        // Create FormData instance
        const formDataObj = new FormData();
        const jsonData = {
            AlternetNumber: formData?.alternatePhone,
            CustomerGSTINNo: formData?.gst,
            PaymentTermId: formData?.paymentType,
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
            ProductDetails: !sellData
                ? [
                      {
                          ProdModelId: formData?.productModel,
                          ProdSerialNo: formData?.productSerialNumber,
                          ProdNumber: formData?.productNumber,
                          ProdDescId: formData?.productDescription,
                          ProdConditionId: formData?.productCondition,
                      },
                  ]
                : sellData?.map((item) => {
                      return {
                          ProdModelId: item?.productModel,
                          ProdSerialNo: item?.productSerialNumber,
                          ProdNumber: item?.productNumber,
                          ProdDescId: item?.productDescription,
                          ProdConditionId: item?.productCondition,
                      };
                  }),
        };
        formDataObj.append("parameters", JSON.stringify(jsonData));
        if (filesUpload?.profOfPurchage.length != 0) {
            filesUpload?.profOfPurchage.forEach((element, i) => {
                element.forEach((ele) => {
                    formDataObj.append(`PurchaseProofFile_${i}`, ele);
                });
            });
        }
        if (filesUpload?.issueSnaps.length != 0) {
            filesUpload.issueSnaps.forEach((element, i) => {
                element.forEach((ele) => {
                    formDataObj.append(`ProductSnaps_${i}`, ele);
                });
            });
        }
        for (const key of formDataObj.entries()) {
            console.log(key);
        }
        dispatch(LoaderAction(true));
        axios
            .post(API_ROUTES.SaveSellDetails, formDataObj, getHeader())
            .then((response) => {
                if (response.data.IsSuccess) {
                    toast.success(response.data.Message);
                } else {
                    toast.error(response.data.Message);
                }
            })
            .catch((error) => {
                // Handle error response
                toast.error("An error occurred. Please try again.");
            })
            .finally((f) => {
                dispatch(LoaderAction(false));
            });
            console.log('formData===>>', formData)
    };

    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(
                `${MasterApi.PROD_TYPE}`,
                getHeader()
            );
            if (response1?.data?.IsSuccess) {
                setProductType(response1?.data?.Data);
            }
        };
        getData();
        return () => {};
    }, [paymentTerm]);
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(
                `${MasterApi.PAYMENT_TERM}`,
                getHeader()
            );
            if (response1?.data?.IsSuccess) {
                setPaymentTerm(response1?.data?.Data);
                // console.log(response1);
            }
        };
        getData();
        return () => {};
    }, []);
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get(
                `${MasterApi.PROD_CONDITION}`,
                getHeader()
            );
            if (response1?.data?.IsSuccess) {
                setProductCondition(response1?.data?.Data);
            }
        };
        getData();
        return () => {};
    }, [productMake]);
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.post(
                `${MasterApi.PROD_DESC}`,
                null,
                getHeader()
            );
            // console.log(response1);
            if (response1?.data?.IsSuccess) {
                setProductDescription(response1?.data?.Data);
            }
        };
        getData();
        return () => {};
    }, [productType]);

    return (
        <>
            <span className="form-heading">Sell</span>
            <form className="sell-form" onSubmit={handleSubmit}>
                <div>
                    <div className="form-expantion">
                        <div
                            className="form-exp-heading"
                            onClick={() =>
                                setExpanded({
                                    ...expanded,
                                    customer: !expanded.customer,
                                })
                            }
                        >
                            <span>Customer</span>
                            <strong>{expanded.customer ? "-" : "+"}</strong>
                        </div>
                        {expanded.customer && (
                            <div className="expanded-form">
                                <div className="expanded-input">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        value={formData.name}
                                        name="name"
                                        type="text"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="mobile">
                                        Mobile Number
                                    </label>
                                    <input
                                        value={formData.phone}
                                        name="phone"
                                        type="text"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        value={formData.email}
                                        name="email"
                                        type="email"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="text">
                                        Alternate Number
                                    </label>
                                    <input
                                        onChange={handleInputChange}
                                        value={formData.alternatePhone}
                                        name="alternatePhone"
                                        type="number"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="gst">
                                        Customer GST Number
                                    </label>

                                    <input
                                        onChange={handleInputChange}
                                        name="gst"
                                        type="text"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="paymentType">
                                        Payment Term
                                    </label>

                                    <select
                                        onChange={handleInputChange}
                                        value={formData?.paymentType}
                                        name="paymentType"
                                        id="paymentTerm"
                                    >
                                        <option value={1}>Select</option>
                                        {paymentTerm &&
                                            paymentTerm.map((st, i) => (
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
                        )}
                    </div>
                    <div className="form-expantion">
                        <div
                            className="form-exp-heading"
                            onClick={() =>
                                setExpanded({
                                    ...expanded,
                                    serviceAddress: !expanded.serviceAddress,
                                })
                            }
                        >
                            <span>Service Address</span>
                            <strong>
                                {expanded.serviceAddress ? "-" : "+"}
                            </strong>
                        </div>
                        {expanded.serviceAddress && (
                            <div className="address card-wrapper forms">
                                <p className="add-address">
                                    Add new address{" "}
                                    <button
                                        onClick={() =>
                                            dispatch(FormPopUpAction("address"))
                                        }
                                        className="active"
                                    >
                                        +
                                    </button>
                                </p>
                                {address.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className={`address-card `}
                                        >
                                            <div className="address-details">
                                                <strong>
                                                    {item?.FullName}{" "}
                                                </strong>
                                                <span>
                                                    Phone : {item?.Mobile}
                                                </span>
                                                <span>
                                                    At : {item?.typeOfAddress}
                                                </span>
                                            </div>
                                            <div className="address-details">
                                                <p>Rajkot, Gujarat</p>
                                                <p>
                                                    Pincode:456545{" "}
                                                    {item.PinCodeId},
                                                    Area:545454 {item.AreaId}
                                                </p>
                                            </div>
                                            <div className="address-actions">
                                                <span
                                                    className={
                                                        idx === index
                                                            ? "active btn"
                                                            : "btn"
                                                    }
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddressSelection(
                                                            idx
                                                        );
                                                    }}
                                                >
                                                    {idx === index
                                                        ? "Selected"
                                                        : "select  "}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="form-expantion">
                        <div
                            className="form-exp-heading"
                            onClick={() =>
                                setExpanded({
                                    ...expanded,
                                    product: !expanded.product,
                                })
                            }
                        >
                            <span>Product Detail</span>
                            <strong>{expanded.product ? "-" : "+"}</strong>
                        </div>
                        {expanded.product && (
                            <div className="expanded-form">
                                <button
                                    onClick={saveData}
                                    className="dynamicInput"
                                >
                                    &#43;
                                </button>
                                <div className="expanded-input">
                                    <label htmlFor="type">Product Type</label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.productType}
                                        name="productType"
                                        id="type"
                                    >
                                        <option value={1}>Select</option>
                                        {productType &&
                                            productType.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="make">Product Make</label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.productMake}
                                        name="productMake"
                                        id="make"
                                    >
                                        <option value="">Select</option>

                                        <option value={1}>Select</option>
                                        {productMake &&
                                            productMake.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="model">Product Model</label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.productModel}
                                        name="productModel"
                                        id="model"
                                    >
                                        <option value={1}>Select</option>
                                        {productModel &&
                                            productModel.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="serialNumber">
                                        Product Serial Number
                                    </label>
                                    <input
                                        onChange={handleInputChange}
                                        value={formData.productSerialNumber}
                                        name="productSerialNumber"
                                        type="text"
                                        id="serialNumber"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="productNumber">
                                        Product Number
                                    </label>
                                    <input
                                        onChange={handleInputChange}
                                        value={formData.productNumber}
                                        name="productNumber"
                                        type="text"
                                        id="productNumber"
                                    />
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="description">
                                        Product Description
                                    </label>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.productDescription}
                                        name="productDescription"
                                        id="description"
                                    >
                                        <option value={1}>Select</option>
                                        {productDescription &&
                                            productDescription.map((st, i) => (
                                                <option key={i} value={st?.Id}>
                                                    {st?.ProductDescription}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="condition">
                                        Product condition
                                    </label>
                                    <select
                                        name="productCondition"
                                        onChange={handleInputChange}
                                        value={formData.productCondition}
                                        id="condition"
                                    >
                                        <option value={1}>Select</option>
                                        {productCondition &&
                                            productCondition.map((st, i) => (
                                                <option
                                                    key={i}
                                                    value={st?.Value}
                                                >
                                                    {st?.Text}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="profOfPurchage">
                                        Prof of purchase ( invoice )
                                    </label>
                                    <div className="service-file-input">
                                        <input
                                            type="file"
                                            id="profOfPurchage"
                                            name="profOfPurchage"
                                            onChange={handleFileUpload}
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            multiple
                                        />
                                        <span>
                                            <span>Choose File</span>
                                            <span>Note: Format JPG & PDF</span>
                                        </span>
                                    </div>
                                    <div className="selected-files">
                                        {filesUpload.profOfPurchage.map(
                                            (file, index) => (
                                                <div key={index}>
                                                    {file.name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="expanded-input">
                                    <label htmlFor="condition">
                                        Issue Snaps
                                    </label>
                                    <div className="service-file-input">
                                        <input
                                            type="file"
                                            id="issueSnaps"
                                            name="issueSnaps"
                                            onChange={handleFileUpload}
                                            multiple
                                            accept=".jpg, .jpeg, .png"
                                        />
                                        <span>
                                            <span>Choose File</span>
                                            <span>
                                                Note : Formate JPG & PDF
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {expanded.product && sellData && (
                            <div class="table-wrapper">
                                <table class="input-data">
                                    <thead>
                                        <tr>
                                            <th>Product Type</th>
                                            <th>Product Make</th>
                                            <th>Product Model</th>
                                            <th>Serial Number</th>
                                            <th>Product Number</th>
                                            <th>Product Condition</th>
                                            <th>Product Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellData?.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.productType}</td>
                                                <td>{item.productMake}</td>
                                                <td>{item.productModel}</td>
                                                <td>
                                                    {item.productSerialNumber}
                                                </td>
                                                <td>{item.productNumber}</td>
                                                <td>{item.productCondition}</td>
                                                <td>{item.productCondition}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <button className="btn active" type="sumbit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Sell;

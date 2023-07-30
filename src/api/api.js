// Define the API endpoint URL
const apiUrl = "http://164.52.216.64/";

const API_ROUTES = {
    signup: apiUrl + "api/CustomerRegistration/CustomerSignUp",
    GetOTPForCustomerLogin: apiUrl + "/api/LoginAPI/GetOTPForCustomerLogin",
    LoginByOTP: apiUrl + "/api/LoginAPI/LoginByOTP",
    Logout: apiUrl + "api/LoginAPI/Logout",
    GetCustomerProfileDetails:
        apiUrl + "api/CustomerRegistration/GetCustomerProfileDetails",
    SaveCustomerDetails:
        apiUrl + "api/CustomerRegistration/SaveCustomerDetails",

    // form submition
    BookService: apiUrl + "/api/CustomerWOEnquiry/SaveWOEnquiry",
    BUY_API: apiUrl + "api/CustomerSOEnquiry/SaveSOEnquiry",
    SaveExtendedWarranty: apiUrl + "/api/ExtendedWarranty/SaveExtendedWarranty",
    SaveSellDetails: apiUrl + "api/CustomerSellModule/SaveSellDetails",

    // work order routes
    WOEnquiryList: apiUrl + "api/CustomerWOEnquiry/WOEnquiryList",
    SubmitWOEnquiryFeedback: apiUrl + "/api/CustomerWOEnquiry/SubmitWOEnquiryFeedback",
    WOEnquiryFeedbackDetails: apiUrl + "/api/CustomerWOEnquiry/WOEnquiryFeedbackDetails",

    // contact us routers
    SubmitContactUs : apiUrl + "/ContactUs/ContactUs_SubmitContactUsForm",
}

export const MasterApi = {
    STATE: apiUrl + "api/MasterDataAPI/GetStatesForSelectList",
    CITY: apiUrl + "api/MasterDataAPI/GetCityForSelectList",
    AREA: apiUrl + "api/MasterDataAPI/GetAreaForSelectList",
    PINCODE: apiUrl + "api/MasterDataAPI/GetPincodeForSelectList",

    PROD_TYPE: apiUrl + "api/MasterDataAPI/GetProductTypesForSelectList",
    PROD_MAKE: apiUrl + "api/MasterDataAPI/GetProductMakesForSelectList",
    PROD_MODEL: apiUrl + "api/MasterDataAPI/GetProductModelsList",
    PROD_CONDITION: apiUrl + "api/MasterDataAPI/GetProductConditionsList",

    PAYMENT_TERM: apiUrl + "api/MasterDataAPI/GetPaymentTermsList",

    SERVICE_LIST: apiUrl + "api/MasterDataAPI/GetServiceTypeList",

    WARRENTY_TYPE: apiUrl + "api/MasterDataAPI/GetWarrantyTypeList",

    ISSUE_DESC: apiUrl + "api/IssueDescriptionAPI/GetIssueDescriptionList",

    BRANCH_LIST: apiUrl + "api/MasterDataAPI/GetBranchesForSelectList",

    PROD_DESC: apiUrl + "api/ProductDescriptionAPI/GetProductDescriptionList",
};

export const getHeader = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            token: token?.Token,
        },
    };
    return config;
};
export default API_ROUTES;

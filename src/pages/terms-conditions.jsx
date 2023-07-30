import React, { useEffect } from "react";
import "../css/terms-conditions.css";
import whatsAppIcon from "../../src/icons/whatsapp.png";
const TermsAndConditions = () => {
    return (
        <>
            <div className="header-wrapper">
                <div className="title">Terms & Conditions</div>
                <div className="icon">
                    <img src={whatsAppIcon} alt="whatsapp" />
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;

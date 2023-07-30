import React from "react";
import "../../css/terms-conditions.css";
import whatsAppIcon from "../../../src/icons/whatsapp.png";
import policyImg from "../../../src/static/assets/policy.png";

function PrivacyPolicy() {
    return (
        <>
            <div className="parent-wrapper">
                <img src={policyImg} alt="policy" className="policy-obj" />
                <div className="header-wrapper">
                    <div className="title">Privacy Policy</div>
                    <div className="icon">
                        <img src={whatsAppIcon} alt="whatsapp" />
                    </div>
                </div>
                <div style={{ padding: "102px" }}>
                    <h1 style={{ marginBottom: "50px", fontSize: "40px" }}>
                        PRIVACY POLICY
                    </h1>
                    <div>
                        <p className="policyPara">
                            ORAREGA TECHNOLOGIES (OPC) Pvt. Ltd. (hereinafter
                            referred to as "the Company"), is the licensed owner
                            of the brand QUIKSERV. Protecting your privacy is
                            important to ORAREGA TECHNOLOGIES (OPC) Pvt. Ltd.
                            This Privacy Policy outlines how the Company
                            collects, uses, discloses, and protects your
                            personal information when you use any services or
                            products provided under the QUIKSERV brand. By
                            accessing or using the Company's services or
                            products, you consent to the collection and use of
                            your personal information as described in this
                            Privacy Policy. The Company assures you that it will
                            only use your personal information in accordance
                            with this privacy statement.
                        </p>
                        <h3 className="policyHead">
                            1.INFORMATION COLLECTION:
                        </h3>
                        <p className="policyPara">
                            A. The Company may collect personal information from
                            you when you interact with the Company, such as when
                            you make a purchase, register an account, or contact
                            customer support. 
                        </p>
                        <p className="policyPara">
                            B. The types of personal information collected may
                            include but are not limited to, Your Name and Job
                            Title, Contact Details, Email Address, Demographic
                            Information such as Postcode, Address, Billing
                            Information, and other information necessary to
                            provide the requested services or products.
                        </p>
                         
                        <h3 className="policyHead">
                            2. WHAT WE DO WITH THE INFORMATION WE COLLECT:
                        </h3>
                        <p className="policyPara">
                            A. The Company may use the collected personal
                            information to provide and improve its services or
                            products, fulfill your requests, process
                            transactions, communicate with you, and personalize
                            your experience. 
                        </p>
                        <p className="policyPara">
                            B. The Company may also use the information for
                            internal purposes such as data analysis, research,
                            and improving its services or products. 
                        </p>
                        <p className="policyPara">
                            C. The Company may use the collected personal
                            information to provide and improve its services or
                            products, fulfill your requests, process
                            transactions, communicate with you, and personalize
                            your experience.
                        </p>
                        <p className="policyPara">
                            D. The Company may also use the information for
                            internal purposes such as data analysis, research,
                            and improving its services or products.
                        </p>
                        <h3 className="policyHead">3. DATA SECURITY: </h3>
                        <p className="policyPara">
                            A. The Company takes reasonable measures to protect
                            your personal information from unauthorized access,
                            alteration, disclosure, or destruction. 
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrivacyPolicy;

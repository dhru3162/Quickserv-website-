import React from "react";
import "../../css/terms-conditions.css";
import whatsAppIcon from "../../../src/icons/whatsapp.png";
import policyImg from "../../../src/static/assets/policy.png";
const PaymentPolicy = () => {
    return (
        <>
            <div className="parent-wrapper">
                <img src={policyImg} alt="policy" className="policy-obj" />
                <div className="header-wrapper">
                    <div className="title">Payment Policy</div>
                    <div className="icon">
                        <img src={whatsAppIcon} alt="whatsapp" />
                    </div>
                </div>
                <div className="content_section">
                    <h1 className="policy_h1">PAYMENT POLICY</h1>
                    <div>
                        <h3 className="policyHead">1. Payment Methods:</h3>
                        <p className="policyPara">
                            <b>Quikserv</b> accepts payments through various
                            methods, including credit/debit cards, Bank
                            transfers, and digital payment platforms. The
                            accepted payment methods will be communicated to
                            customers during the booking process.
                        </p>
                        <h3 className="policyHead">2. Quotation Issuance:</h3>
                        <p className="policyPara">
                            <b>Quikserv</b> will provide the quotation about a
                            Service Charge & Spare parts charge.
                        </p>
                        <h3 className="policyHead">3. Payment Terms:</h3>
                        <p className="policyPara">
                            Customers are required to make the Advance payment
                            for the services before the scheduled start date.
                            Payment terms may vary depending on the type and
                            duration of the service. Any outstanding balances
                            must be settled before the service commencement.
                        </p>
                        <h3 className="policyHead">4. Payment Terms:</h3>
                        <p className="policyPara">
                            <b>Quikserv</b> will provide the invoice detailing
                            the payment amount, service description, and any
                            applicable taxes or fees. The invoice will be sent
                            to the customer's provided email address or made
                            available through the customer portal.
                        </p>
                        <h3 className="policyHead">5. Currency and Taxes:</h3>
                        <p className="policyPara">
                            All payments should be made in the currency
                            specified by Quikserv. Customers are responsible for
                            applicable taxes, duties, or fees as local
                            regulations require. The total payment amount will
                            include these additional charges, where applicable.
                        </p>
                        <h3 className="policyHead">6. Refunds:</h3>
                        <p className="policyPara">
                            Refunds for cancellations or service terminations
                            will be processed by the Refund and Cancellation
                            Policy outlined separately.
                        </p>
                        <h3 className="policyHead">7. Security:</h3>
                        <p className="policyPara">
                            <b>Quikserv</b> takes the security of customer
                            payment information seriously. Adequate measures are
                            implemented to protect sensitive data during payment
                            processing. However, customers are encouraged to
                            take necessary precautions when providing online
                            payment details.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPolicy;

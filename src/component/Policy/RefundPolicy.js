import "../../css/terms-conditions.css";
import whatsAppIcon from "../../../src/icons/whatsapp.png";
import policyImg from "../../../src/static/assets/policy.png";
const RefundPolicy = () => {
    return (
        <>
            <div className="parent-wrapper">
                <img src={policyImg} alt="policy" className="policy-obj" />
                <div className="header-wrapper">
                    <div className="title">Refund and Cancellation Policy</div>
                    <div className="icon">
                        <img src={whatsAppIcon} alt="whatsapp" />
                    </div>
                </div>
                <div style={{ padding: "102px" }}>
                    <h1 style={{ marginBottom: "50px", fontSize: "40px" }}>
                        REFUND AND CANCELLATION POLICY
                    </h1>
                    <div>
                        <p className="policyPara">
                            Cancellation Requests: Customers are required to
                            submit cancellation requests through the website or
                            customer app. Verbal cancellation requests will not
                            be accepted.
                        </p>

                        <p className="policyPara">
                            (Timeframe: Cancellation requests must be received
                            before the scheduled start date of the service.)
                        </p>

                        <h3 className="policyHead">Refunds: </h3>
                        <p className="policyPara">
                            Refunds will be issued based on the following
                            criteria:
                        </p>

                        <p className="policyPara">
                            A. Cancellation requests received before the
                            scheduled start date of the service will be eligible
                            for a refund of the total service charge amount,
                            minus a processing fee of 300 Rs + GST.
                        </p>
                        <p className="policyPara">
                            B. If a cancellation request is received after the
                            scheduled start date and an Engineer has already
                            been assigned, the service charge will not be
                            refunded.
                        </p>
                        <p className="policyPara">
                            C. In cases where spare parts have been ordered for
                            the service and cancellation occurs after ordering,
                            the service charge will not be refunded.
                        </p>
                        <p className="policyPara">
                            D. Non-Refundable Services: Please note that certain
                            services may be non-refundable. Customers will be
                            informed about this at the time of booking.
                        </p>

                        <p className="policyPara">
                            <b>Rescheduling:</b> In some cases, customers may be
                            allowed to reschedule their service instead of
                            cancelling. The availability of rescheduling will be
                            subject to the company's discretion and the specific
                            circumstances of the request.
                        </p>
                        <p className="policyPara">
                            <b>Termination of Services:</b> If a customer
                            decides to terminate the ongoing services before
                            completion, a refund will be processed based on the
                            work completed up to the termination date, minus any
                            applicable cancellation fees.
                        </p>
                        <p className="policyPara">
                            <b>Force Majeure:</b> In the event of unforeseen
                            circumstances, such as natural disasters, strikes,
                            or other events beyond the company's control,
                            ORAREGA Technologies (OPC) Pvt. Ltd. reserves the
                            right to cancel or reschedule services without
                            liability. In such cases, customers will be notified
                            as soon as possible, and alternative options will be
                            provided.
                        </p>
                        <p className="policyPara">
                            If the payment was by credit/debit cards, Bank
                            transfers, and digital payment platforms, we will
                            refund the money in your credit/debit cards, Bank
                            transfers, and digital payment platforms. Typically,
                            refunds are processed in between 15 working days
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RefundPolicy;

import React, { useState } from 'react'
import "../../css/form/work-order.css"
import icons from '../../icons/icon'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import Feedback from "../form/Feedback"
import API_ROUTES, { getHeader } from '../../api/api'

const WorkOrder = () => {
    const [workOrder, setWorkOrder] = useState(null);
    const [feedback, setFeedback] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        axios.post(API_ROUTES.WOEnquiryList, null, getHeader())
            .then(response => {
                setWorkOrder(response?.data?.Data)
            })
            .catch(error => {

            })
    }, [])
    return (
        <>

            {
                feedback && <Feedback WOEnquiryId={feedback}  setFeedback = {setFeedback}/>
            }
            <span className='form-heading'>Work Order</span>
            <div className="work-order">
                <form className="search-form">
                    <img className='search' src={icons.search} alt="" />
                    <input type="text" id='search-text' placeholder='Search...' />
                    <label htmlFor="search-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, rerum.</label>
                </form>
                <div className="order-detail-container">
                    {
                        workOrder?.map((order) => {
                            const { FirstName, LastName, EnquiryStatusId, IssueDesc, Mobile, PaymentStatus, ServiceAddress, StatusName, Id } = order;
                            return <>

                                <div key={Id} className="order-detail">
                                    <div className="detail-list">
                                        <h2>Name</h2>
                                        <span>{FirstName + " " + LastName}</span>
                                    </div>
                                    <div className="detail-list">
                                        <h2>Service Address</h2>
                                        <span>{ServiceAddress}</span>
                                    </div>
                                    <div className="detail-list">
                                        <h2>Issue Description</h2>
                                        <span>{IssueDesc ? IssueDesc : "Nothing"}</span>
                                    </div>
                                    <div className="detail-list feedback">
                                        <div>
                                            <h2>Payment Status</h2>
                                            <span>{PaymentStatus ? "Paid" : "Unpaid"}</span>
                                        </div>
                                        <div>
                                            <h2>Work Order Status</h2>
                                            <span>{StatusName}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setFeedback(Id)} className='btn active feedback-btn'>Feedback</button>
                                </div>
                            </>
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default WorkOrder
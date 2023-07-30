import React, { useState } from 'react'
import "../../css/form/feedback.css"
import axios from 'axios';
import API_ROUTES, { getHeader } from '../../api/api';
import { toast } from 'react-toastify';
const Feedback = ({ WOEnquiryId, setFeedback }) => {
    const [formData, setFormData] = useState({
        Rating: 0,
        WOEnquiryId,
        OverallExperience: 0,
        Comment: "",
    })
    const handleSubmit = () => {
        if (formData.Rating < 0 || formData.Rating > 5) {
            toast.error("Rating must be between 0 and 5.")
            return
        }
        // Validate OverallExperience
        else if (formData.OverallExperience < 0 || formData.OverallExperience > 5) {
            toast.error("Overall experience must be between 0 and 5.")
            return;
        }

        // Validate Comment
        else if (formData.Comment.length < 5) {
            toast.error("Comment must be at least 5 characters long.")
        }
        else {
            axios.post(API_ROUTES.SubmitWOEnquiryFeedback, formData, getHeader())
                .then(response => {
                    if (response?.data?.IsSuccess) {
                        toast.success(response?.data?.Message)
                        setFeedback("")
                    }
                    else {
                        toast.error(response?.data?.Message)
                    }
                })
                .catch(error => {
                    toast.error("Error Occur while submitting the form")
                })
        }

    };




    return (
        <>
            <div className="feedback-container">
                <span className='form-heading'>Feedback</span>
                <button onClick={() => setFeedback("")} className='pop-close active'>&times;</button>
                <div className="feedback-form">
                    <div className="expanded-input">
                        <label htmlFor="orderid">Order Id</label>
                        <input type="text" id='orderid' placeholder='12 545454' />
                    </div>
                    <div className="expanded-input">
                        <label htmlFor="date">Order Date</label>
                        <input type="date" placeholder='12 / 02 /2023' />
                    </div>
                    <div className="expanded-input">
                        <label htmlFor="rating">Your OverallExperience</label>
                        <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        id="reviewStar"
                                        className={index <= formData.Rating ? "on" : "off"}
                                        onClick={() => setFormData({ ...formData, Rating: index })}
                                    >
                                        <span className="star">&#9733;</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="expanded-input">
                        <label htmlFor="text">How you want to rate us</label>
                        <div className="emogi-rating">
                            {[...Array(5)].map((_, index) => {
                                const emojiValue = index + 1;
                                let emoji;
                                switch (emojiValue) {
                                    case 1:
                                        emoji = '😃';
                                        break;
                                    case 2:
                                        emoji = '🙂';
                                        break;
                                    case 3:
                                        emoji = '😐';
                                        break;
                                    case 4:
                                        emoji = '😕';
                                        break;
                                    case 5:
                                        emoji = '😡';
                                        break;
                                    default:
                                        emoji = '😐';
                                }
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        id="reviewEmogi"
                                        className={emojiValue === formData.OverallExperience ? 'on' : 'off'}
                                        onClick={() => setFormData({ ...formData, OverallExperience: index + 1 })}
                                    >
                                        {emoji}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="expanded-input">
                        <label htmlFor="text">Customer Comments</label>
                        <input value={formData.Comment} onChange={(e) => setFormData({ ...formData, Comment: e.target.value })} type="text" placeholder='Write..' />
                    </div>
                </div>
                <button onClick={handleSubmit} className='btn active feed-btn'>Submit</button>
            </div>
        </>
    )
}

export default Feedback
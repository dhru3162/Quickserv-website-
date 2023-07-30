import React from 'react'
import "../../css/form/track-request.css"
import icons from '../../icons/icon'
import status, { statusData } from '../../icons/request-status/status'

const TrackRequest = () => {
    const count = 3
    const getStatusImage = (index) => {
        if (index < count) {
            return status[statusData[index].statusKey].done;
        } else {
            return status[statusData[index].statusKey].pending
        }
    };
    return (
        <>
            <span className='form-heading'>Track work request</span>
            <div className="track-request">
                <form className="search-form">
                    <img className='search' src={icons.search} alt="" />
                    <input type="text" id='search-text' placeholder='Search...' />
                    <label htmlFor="search-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, rerum.</label>
                </form>
                <div className="request-detail">
                    <div className="detail-list">
                        <h2>Customer Name</h2>
                        <span>John Doe</span>
                    </div>
                    <div className="detail-list">
                        <h2>Service Address</h2>
                        <span>H.no 10 indra colony bhopal M.P</span>
                    </div>
                    <div className="detail-list">
                        <h2>Issue Description</h2>
                        <span>Lorem ipsum dolor sit amr adipisicing elit. Sit, facilis.</span>
                    </div>
                    <div className="detail-list payment">
                        <div>
                            <h2>Payment Status</h2>
                            <span>Paid/Unpaid</span>
                        </div>
                        <div>
                            <h2>Work Order Status</h2>
                            <span>Active</span>
                        </div>
                    </div>
                </div>

                <div className="request-status">
                    <h1>Status</h1>
                    <div className="r-s-container">
                        {statusData.map((statusItem, index) => (
                            <div className="status-icons" key={index}>
                                <div className={index >= count && 'status-done'}>
                                    <img src={getStatusImage(index)} alt="" />
                                </div>
                                <span>{statusItem.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackRequest
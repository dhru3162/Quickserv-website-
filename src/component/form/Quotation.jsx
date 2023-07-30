import React, { useState } from 'react'
import "../../css/form/quotation-card.css"
import icons from '../../icons/icon'

const Quotation = () => {
    const [activeOption, setActiveOption] = useState('Pending');

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };
    return (
        <>
            <span className='form-heading'>Quotation</span>
            <div className="quotation">
                <form className="search-form">
                    <img className='search' src={icons.search} alt="" />
                    <input type="text" id='search-text' placeholder='Search...' />
                    <label htmlFor="search-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, rerum.</label>
                </form>
                <div className="quptation-option">
                    <span
                        className={activeOption === 'Pending' ? 'active' : ''}
                        onClick={() => handleOptionClick('Pending')}
                    >
                        Pending
                    </span>
                    <span
                        className={activeOption === 'Accepted' ? 'active' : ''}
                        onClick={() => handleOptionClick('Accepted')}
                    >
                        Accepted
                    </span>
                    <span
                        className={activeOption === 'Rejected' ? 'active' : ''}
                        onClick={() => handleOptionClick('Rejected')}
                    >
                        Rejected
                    </span>
                </div>
                <div className="quotation-card-container">
                    <div className="quotation-card">
                        <div className='q-c-left'>
                            <img src={icons.pdf} alt="" />
                            <div className='i-c-type'>
                                <span>Invoice -: Mr. Sagar Laxman Tathe</span>
                                <span>Document</span>
                            </div>
                        </div>
                        <div className="quotation-btn">
                            <button className="btn active">
                                Accept
                            </button>
                            <button className="btn active">
                                Reject
                            </button>
                        </div>

                    </div>
                    <div className="quotation-card">
                        <div className='q-c-left'>
                            <img src={icons.pdf} alt="" />
                            <div className='i-c-type'>
                                <span>Invoice -: Mr. Sagar Laxman Tathe</span>
                                <span>Document</span>
                            </div>
                        </div>
                        <div className="quotation-btn">
                            <button className="btn active">
                                Accept
                            </button>
                            <button className="btn active">
                                Reject
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Quotation
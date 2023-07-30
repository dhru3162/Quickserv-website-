import React from 'react'
import "../../css/form/invoice.css"
import icons from '../../icons/icon'
const Invoice = () => {
    return (
        <>
            <span className='form-heading'>Invoice</span>
            <div className="invoice">
                <form className="search-form">
                    <img className='search' src={icons.search} alt="" />
                    <input type="text" id='search-text' placeholder='Search...' />
                    <label htmlFor="search-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, rerum.</label>
                </form>
                <div className="invoice-card-container">
                    <div className="invoice-card">
                        <img src={icons.pdf} alt="" />
                        <div className='i-c-type'>
                            <span>Invoice -: Mr. Sagar Laxman Tathe</span>
                            <span>Document</span>
                        </div>

                    </div>
                </div>
                <div className="invoice-card-container">
                    <div className="invoice-card">
                        <img src={icons.pdf} alt="" />
                        <div className='i-c-type'>
                            <span>Invoice -: Mr. Sagar Laxman Tathe</span>
                            <span>Document</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Invoice
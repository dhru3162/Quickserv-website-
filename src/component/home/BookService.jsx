import React, { useState } from 'react'
import icons from '../../icons/icon'
import { useSelector } from 'react-redux'

const BookService = () => {
    const [num, setNumber] = useState("")
    const SubmitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="book-service">
                <img src={icons.gear} alt="" className="gear-left" />
                <div className="company-logo"><img src={icons.LOGO} alt="" /></div>
                <h1>BOOK YOUR SERVICE AT DOORSTEP</h1>
                <p>Get the app download link on your mobile phone</p>
                <form>
                    <input  onChange={(e) => setNumber(e.target.value)} type="text" />
                    <button className='btn active' onClick={SubmitHandler}>GET APP LINK</button>
                    <img src={icons.PLAY_STORE} alt="" />
                </form>
                <img src={icons.gear} alt="" className="gear-right" />
            </div>
        </>
    )
}

export default BookService
import React, { useEffect, useState } from 'react'
import "../css/contact-us.css"
import { useDispatch } from 'react-redux'
import icons, { socialMediaIcons } from '../icons/icon'
import UserHero from './user/UserHero'
import { pageBanner } from '../static/banners/banner'
import whatsapp from "../icons/whatsapp.png"
import { ContactUsActionSubmit } from '../redux/action/ContacrusAction'
const Contactus = () => {

    useEffect(() => {
        document.title = 'Quickserv | Contact-Us';
        window.scrollTo(0, 0);
        return () => { };
    }, []);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
        issue: '',
        comment: '',
        file: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            file
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        dispatch(ContactUsActionSubmit(formData))
        // Reset the form
        // setFormData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     phoneNumber: '',
        //     address: '',
        //     state: '',
        //     city: '',
        //     pincode: '',
        //     issue: '',
        //     comment: '',
        //     file: null
        // });
    };

    // useEffect(() => {
    //     ContactUsActionSubmit()
    // })
    return (
        <>
            <section className="contact-us">
                <UserHero banner={pageBanner.contactUsBanner} />
            </section>
            <div className="c-u-container">
                <div className="s-c-header">
                    <div>
                        <h1>Can we help you </h1>
                        <span>Get free telephonic technical assistance...</span>
                    </div>
                </div>
                <div className="c-u-form">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="fname">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder='Enter first name'
                                    className="fname"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-input">
                                <label htmlFor="lname">Last Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter last name'
                                    name="lastName"
                                    className="lname"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Enter email'
                                    className="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="phone">Contact No.</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder='Enter contact No.'
                                    className="phone"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder='Enter address'
                                    className="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="state">State</label>
                                <select
                                    name="state"
                                    className="state"
                                    
                                    value={formData.state}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select State</option>
                                    <option value="state1">State 1</option>
                                    <option value="state2">State 2</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                            <div className="form-input">
                                <label htmlFor="city">City</label>
                                <select
                                    name="city"
                                    className="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select</option>
                                    <option value="city1">City 1</option>
                                    <option value="city2">City 2</option>
                                </select>
                            </div>
                            <div className="form-input">
                                <label htmlFor="pincode">Pin Code</label>
                                <select
                                    name="pincode"
                                    className="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select</option>
                                    <option value="1">City 1</option>
                                    <option value="2">City 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="issue">Issue</label>
                                <input
                                    type="text"
                                    name="issue"
                                    className="issue"
                                    placeholder='Enter'
                                    value={formData.issue}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <label htmlFor="comment">Your Comment</label>
                                <textarea
                                    name="comment"
                                    placeholder='Enter'
                                    className="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <img src={icons.coud_upload} alt="" />
                            </div>
                            <div className="form-input">

                                <input
                                    type="file"
                                    name="file"
                                    className="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <button className="btn active" type="submit">Submit</button>
                        </div>
                    </form>
                    < div className="support-map">
                        <div className="c-u-phone">
                            <div>
                                <img src={icons.PHONE} alt="" />
                                <span>+91-7030087300</span>
                            </div>
                            <div>
                                <img src={icons.EMAIL} alt="" />
                                <span>support@quikserv.com</span>
                            </div>
                        </div>
                        <div className="c-u-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.8191429873805!2d73.74194093849627!3d18.590339237888703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbde6ac575a3%3A0xd4560a4389a8487e!2sIcon%20Viva!5e0!3m2!1sen!2sin!4v1686981847956!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>

                    </div>
                </div>

            </div>
            <div className="c-u-social">
                <h2>Social Media</h2>
                <div className="social-icons">
                    {
                        socialMediaIcons.map((item, i) => {
                            return <a target='_blank' href={item.link}><img src={item.icon} alt={item.platform} /></a>
                        })
                    }
                    <a target='_blank' href=""><img src={whatsapp} /></a>

                </div>
            </div>

        </>
    )
}

export default Contactus
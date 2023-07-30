import React, { useEffect } from 'react'
import "../css/career.css"
import SearchCard from '../component/SearchCard'
import UserHero from './user/UserHero'
import { pageBanner } from "../static/banners/banner"


const Career = () => {
    useEffect(() => {
        document.title = 'Quickserv | Career';
        window.scrollTo(0, 0);
        return () => { };
    }, []);

    return (
        <>
            <UserHero banner={pageBanner.carrerBanner} />
            <section className="Career">
                <div className="c-about">
                    <div>

                        <h1>About Us</h1>
                    </div>
                    <p>
                        Quikserv provides IT services (Laptops, Printers, Desktop, and Chip-level repair) and is a Skillful service provider dedicated to repairing and maintaining IT services. <br />
                        Our company specializes in offering Secure, reliable, Affordable, and Quick Service repair solutions to individuals and businesses.
                        We Make Technology Accessible.
                        We Provide AMC (Annual Maintenance Contract ) Service.
                    </p>
                </div>
                <div className="why-join">
                    <div className="w-j-content">
                        <div>
                            <h1>Why Should you Join Quikserv </h1>

                        </div>
                        <p>
                            A great workplace combines colleagues who’re like a family and a new challenge each day. Do you think you have what it takes to face challenges to turn our customer’s experience into a Greater experience? If yes, this is the place for you!
                            At QuickServ, we are constantly working on creating a working environment that combines uncompromising integrity with professional excellence. We are looking for those with exceptional dynamism, both as team leaders and players, to deliver phenomenal business results.
                            Quickserv represents the key to our success and we are constantly looking for passionate and energetic individuals to share in our vision of being the most customer-obsessed company in India.
                        </p>
                    </div>
                    <div className="w-j-img">
                        <img src={Career} alt="" />
                    </div>
                </div>
                <div className="find-job">
                    <h1>Find Job</h1>
                    <div className="form-card">
                        <input type="text" placeholder='Search for job by title or keywords ' />
                        <div>
                            <input type="text" placeholder='Location' />
                            <button className='btn active'>Search</button>
                        </div>
                    </div>

                </div>
                <div className="search-card-container">
                    <SearchCard />
                    {/* <SearchCard /> */}
                </div>
            </section>
        </>
    )
}

export default Career
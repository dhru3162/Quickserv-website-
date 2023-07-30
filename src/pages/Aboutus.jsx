import React, { useEffect, useState } from 'react'
import "../css/about-us.css"
import BookService from '../component/home/BookService'
import UserHero from './user/UserHero'
import { pageBanner } from '../static/banners/banner'
import assets from '../static/assets/assets'
const Aboutus = () => {
  useEffect(() => {
    document.title = 'Quickserv | About-Us'; 
    window.scrollTo(0, 0);
    return () => { };
  }, []);
  const [about, setAbout] = useState(true)
  return (
    <>
      <section className="user-home">
        <UserHero  banner={pageBanner.aboutUsBanner} />
        <section className="about-us">
          <div className="a-u-button">
            <button onClick={() => setAbout(true)} className={about ? 'btn active' : 'btn'}>What is QUIKSERV</button>
            <button onClick={() => setAbout(false)} className={about ? 'btn' : 'btn active'}>What we do</button>
          </div>
          {about ? <div className="a-content">
            <p>Quikserv provides IT services (Laptops, Printers, Desktop, and Chip-level repair) and is a Skillful service provider dedicated to repairing and maintaining IT services.
              Our company specializes in offering Secure, reliable, Affordable, and Quick Service repair solutions to individuals and businesses.
              We Make Technology Accessible.
              We Provide AMC (Annual Maintenance Contract ) Service.</p>
            <div className="a-img">
              <img src={assets.user_home} alt="" />
            </div>
          </div>
            :
            <div className="a-content reverse">
              <p>Quikserv provides the best IT services to customers (Laptop, Printer, Desktop, and Chip-level Repair Services). We prioritize customer satisfaction and strive to deliver exceptional service.
                We are also providing Doorstep services to our customers within 24 hours.
                We provide free telephonic technical assistance for customers.
                Our team consists of Best Qualified Engineers who are experienced in IT Services. They stay up to date with the latest technologies and repair techniques to provide the Best solutions.
                We strive to exceed expectations and provide a hassle-free experience for all our customers.</p>
              <div className="a-img">
                <img src={assets.what_we_do} />
              </div>
            </div>
          }
        </section>
      </section>
      <BookService />
    </>
  )
}

export default Aboutus
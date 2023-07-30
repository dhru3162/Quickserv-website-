import React, { useEffect, useRef, useState } from 'react'
import icons from '../../icons/icon'
import "../../css/home/service.css"
import services from '../../static/Our Services/services'
import assets from '../../static/assets/assets'

const Service = () => {
  const [activePoint, setActivePoint] = useState(0);
  const cardContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    cardContainerRef.current.scrollTo({
      left: cardContainerRef.current.scrollLeft + 2 * scrollOffset,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = cardContainerRef.current.scrollLeft;
      setActivePoint(Math.floor(scrollLeft * 3 / cardContainerRef.current.offsetWidth));
    };

    cardContainerRef?.current?.addEventListener('scroll', handleScroll);

    return () => {
      cardContainerRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <section className='service'>
        <div className=" home_card_header">
          <div className='container-header'> <h1>Our Services</h1> <img src={icons.SERVICE} alt="" /></div>

        </div>
        <div className="service-container">
          <div className="service-left">
            <div className="service-img">
              <img className='logo' src={icons.LOGO} alt="" />
              <img src={assets.service} alt="" />
            </div>
            <img className='service-scroller' onClick={() => handleScroll(170)} src={icons.serviceScroll} alt="" />
          </div>
          <div className="service-scroll-controller">
            <div ref={cardContainerRef} className="card-container">
              {
                services.map(item => {
                  return <>
                    <div className="service-card">
                      <img src={item.image} alt="" />
                      <div className="service-content">
                        <button>{item.service}</button>
                        <p>
                          <ul className="service-description">
                            {item.description.split('.').map((line, index) => (
                              line.trim() && <li key={index}>{line.trim()}</li>
                            ))}
                          </ul>
                        </p>
                      </div>

                    </div>
                  </>
                })
              }

            </div>
            <div className="scroll-bar-indicator">
              {
                [1, 2, 3].map(item => <span key={item} className={`indicator ${item === activePoint ? 'active' : ''}`}></span>)
              }
            </div>
            <img onClick={() => handleScroll(-170)} src={icons.serviceScroll}  className="service-right-scroll" />
          </div>
        </div>
      </section>

    </>

  )
}

export default Service
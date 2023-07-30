import React, { useRef } from 'react'
import icons from '../../icons/icon'
import "../../css/home/testimonial.css"
import { customerReviews } from '../../static/assets/assets'

const Testimonial = () => {
    const cardContainerRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        cardContainerRef.current.scrollTo({
            left: cardContainerRef.current.scrollLeft + 2 * scrollOffset,
            behavior: 'smooth',
        });
    };
    return (
        <section className="testimonials">

            <div className="testi_header home_card_header">
                <div className='container-header'> <h1>Testimonials</h1> <img src={icons.SERVICE} alt="" /></div>

            </div>
            <div className="testimonial_carousel">
                <img onClick={() => handleScroll(-160)} src={icons.left_scroll} alt="" className="left_scroll" />
                <div ref={cardContainerRef} className="card-container">
                    {
                        customerReviews.map((item, i) => {
                            return <>
                                <div key={i} className="testi_carousel_card">
                                    <span className='quote'><img src="./logo.png" alt="" /></span>
                                    <p>
                                        {item?.feedback?.slice(0, 200)}...
                                    </p>

                                    <h2>{item.name}</h2>
                                    <span>
                                        {item?.designation ?item?.designation:"End User"} ( {item?.city} )
                                    </span>

                                </div>
                            </>
                        })
                    }
                </div>
                <img onClick={() => handleScroll(160)} src={icons.left_scroll} alt="" className="right_scroll" />
            </div>


        </section>
    )
}

export default Testimonial

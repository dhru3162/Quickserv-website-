import React, { useEffect, useRef, useState } from 'react'
import "../../css/home/our-product.css"
import icons from '../../icons/icon'
import { FormPopUpAction } from '../../redux/action/TogfleAction'
import { useDispatch } from 'react-redux'
import product from '../../static/Product/product'

const OurProduct = () => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activePoint, setActivePoint] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrollLeft = containerRef.current.scrollLeft;
            setScrollPosition(scrollLeft);
            setActivePoint(Math.floor(scrollLeft * 2 / containerRef.current.offsetWidth));
        };

        containerRef?.current?.addEventListener('scroll', handleScroll);

        return () => {
            containerRef?.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className="our-product">
                <div className="home_card_header">
                    <div className='container-header'> <h1>Our Product</h1> <img src={icons.SERVICE} alt="" /></div>
                </div>
                <div ref={containerRef} className="card-container">
                    {
                        product.map((item, i) => {
                            return <>
                                <div key={i} className="product-card">
                                    <img src={item.imgage} alt="" />
                                    <span>
                                        {item.title}
                                    </span>

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
                <div className="o-p-button">
                    <button onClick={() => dispatch(FormPopUpAction("service"))} className='btn active'>Book Our Service <img src={icons.singleGear} alt="" /></button>
                </div>
            </div>
        </>
    )
}

export default OurProduct
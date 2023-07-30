import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingPageBanner from '../../static/banners/banner';
import { useDispatch } from 'react-redux';
import { FormPopUpAction } from '../../redux/action/TogfleAction';

const ImageScroll = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    beforeChange: (current, next) => {
      setCurrentIndex(next);
      if (next === LandingPageBanner.length - 1) {
        setTimeout(() => {
          sliderRef.current.slickGoTo(0);
        }, 0);
      }
    },
    afterChange: (current) => {
      if (current === 0 && currentIndex === LandingPageBanner.length - 1) {
        sliderRef.current.slickNext();
      }
    },
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (path) => {
    dispatch(FormPopUpAction(path));
  };

  return (
    <div className="hero-image">
      <Slider ref={sliderRef} {...settings} className="hero-images">
        {LandingPageBanner.map((image, index) => (
          <div key={index} className={index === currentIndex ? 'active-slide' : ''}>
            <img
              onClick={() => handleImageClick(image.path)}
              style={{ animationDelay: `${1 * index}s` }}
              src={image.img}
              alt="Image"
              className="clickable-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageScroll;

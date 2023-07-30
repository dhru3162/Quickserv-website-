import React, { useEffect, useRef, useState } from 'react'
import "../../css/home/hero.css"
import ImageScroll from './ImageScroll'
import assets from '../../static/assets/assets'
const Hero = () => {
  return (
    <>
      <section className="hero" >
        <ImageScroll />
        <img src={assets.sell_banner} alt="" />
      </section>
    </>
  )
}

export default Hero
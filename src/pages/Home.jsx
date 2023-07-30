import React, { useEffect } from 'react'
import Hero from '../component/home/Hero'
import Testimonial from '../component/home/Testimonial'
import HowItWork from '../component/home/HowItWork'
import OurProduct from '../component/home/OurProduct'
import Service from '../component/home/Service'
import BookService from '../component/home/BookService'
import { useSelector } from 'react-redux'

const Home = () => {
  useEffect(() => {
    document.title = 'Quickserv | Home';
    window.scrollTo(0, 0);
    return () => { };
  }, []);
  const { user } = useSelector(state => state?.user)
  return (
    <>
      <section>
        <Hero />
        <Service />
        <OurProduct />
        {!user && <>
          <HowItWork />
          <BookService />
          <Testimonial />
        </>}
      </section>
    </>
  )
}

export default Home
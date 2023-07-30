import Footer from "../../component/Footer"
import Header from "../../component/Header"
import BookService from "../../component/home/BookService"
import Hero from "../../component/home/Hero"


const UserHome = () => {
  return (
    <>
      <section>
        <Header />
        <Hero />
        <BookService/>
        <Footer />
      </section>
    </>
  )
}

export default UserHome
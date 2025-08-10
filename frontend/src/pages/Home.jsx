import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Display from '../components/Display'
import Footer from '../components/Footer'

const Home = () => {
   const [category,setCategory] = useState("All")
  return (
    <div>
      <Navbar />
      <Menu category={category} setCategory={setCategory}/>
      <Display category={category} />
      <Footer />
    </div>
  )
}

export default Home

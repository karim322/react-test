import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>this is Home 2

      <Link to='/about' >about</Link>
      <Link to='/param/12345' >param</Link>
    </div>
  )
}

export default Home
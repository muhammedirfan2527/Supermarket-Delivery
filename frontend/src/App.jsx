import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './components/Login'
import Favourite from './pages/Favourite'
import Myorder from './pages/Myorder'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/favourite' element={<Favourite />} />
        <Route path='myorder' element={<Myorder />} />
      </Routes>
        {/* <GoogleOAuthProvider clientId="622165410918-ug13o811dharhot680bp22avsig9ig2u.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider> */}
    </div>
  )
}

export default App

import React from 'react'
import "./Admin.css";
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
import UpdateProduct from '../components/UpdateProduct';
import Orders from '../components/Orders';

const Admin = () => {
  return (
    <div className='admin'>
      <div>
        <Sidebar/>
      </div>
        <div>
            <Routes>
                <Route path={'/addproduct'} element={<AddProduct/>}/>
                <Route path={'/listproduct'} element={<ListProduct/>} /> 
                <Route path={'/updateproduct/:id'} element={<UpdateProduct/>} />
                <Route path={'/orders'} element={<Orders />} />
            </Routes>
        </div>
    </div>
  )
}

export default Admin

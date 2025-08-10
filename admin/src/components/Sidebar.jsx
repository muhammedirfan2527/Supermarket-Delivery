// import React from 'react'
// import './Sidebar.css'
// import { Link } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>

//       <Link to='/addproduct'><p>Add Product</p></Link>
//       <Link to='/listproduct'><p>List Product</p></Link>
//     </div>
//   )
// }

// export default Sidebar


import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';  // Import NavLink

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink id='sidebaradd' to='/addproduct' className={({ isActive }) => isActive ? 'active' : ''}><p>Add Product</p></NavLink>
      <NavLink to='/listproduct' className={({ isActive }) => isActive ? 'active' : ''}><p>List Product</p></NavLink>
      <NavLink to='/orders' className={({isActive}) => isActive ? 'active' : ''}>Orders</NavLink>
    </div>
  );
};

export default Sidebar;
// import React, { useEffect, useState } from 'react'
// import './ListProduct.css'

// const ListProduct = () => {
//   const [allproduct,setAllproduct] = useState([]);

//   const fetchInfo = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/workout/');
//       if (!response.ok) throw new Error('Failed to fetch data');
//       const data = await response.json();
//       setAllproduct(data);
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//     }
//   };
//   useEffect(()=>{
//     fetchInfo();
//   },[])
// console.log(allproduct)
//   return (
//     <div className='listProduct'>
//       <div className='header-list'>
//         <p>Image</p>
//         <p>Product Category</p>
//         <p>Name</p>
//         <p>Price</p>
//         <p>Measurement</p>
//       </div>
//       <div>
//         {
//           allproduct.map((data)=>{
//             return <>
//             <div>
//               <img src={data.image} alt="" />
//               <p>{data.category}</p>
//               <p>{data.name}</p>
//               <p>{data.price}</p>
//               <p>{data.measurement}</p>
//             </div>
//             </>
//           })
//         }
//       </div>
//     </div>
//   )
// }

// export default ListProduct

import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import {Link} from 'react-router-dom'

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search,setSearch] = useState('')
  const [filteredData,setFilteredData] = useState([])
  const [category,setCategory] = useState('all')

  console.log(category)

  console.log(allProducts.name)
 
  // Function to fetch data
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/workout/');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setAllProducts(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchInfo();
  }, []);

  console.log(allProducts);

  const deleteProduct = async (id) => {
      const deletee = await fetch(`http://localhost:4000/api/workout/${id}`,{
        method:'DELETE'
      })

      if(deletee.ok){ 
        setAllProducts((prev)=> prev.filter((product)=> product._id !== id))
        console.log("deleted")
      }else{
        console.log("fail")
      }
  }

  const Searchhandle = (event)=>{
    setSearch(event.target.value)
  }

  useEffect(() => {
    const filtered = allProducts.filter((item) => {
      return (category === 'all' || item.category === category) &&
             item.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredData(filtered);
  }, [allProducts, search, category]);
  
  console.log(filteredData)

  return (
    <div className="listProduct">
      <div className='search'>
      <select  name='category' onChange={(event)=>{setCategory(event.target.value)}}>
            <option value="all">Select Category</option>
            <option value="all">All</option>
            <option value="Dairy product">Dairy product</option>
            <option value="Bakery">Bakery</option>
            <option value="Beverages">Beverages</option>
            <option value="Breakfast cereals">Breakfast cereals</option>
            <option value="Meat">Meat</option>
            <option value="Produce">Produce</option>
            <option value="Seafood">Seafood</option>
            <option value="Snacks">Snacks</option>
        </select>
      <input type="text" onChange={Searchhandle} placeholder='search here'/>
      </div>
      <div className="header-list">
        <p>Image</p>
        <p>Product Category</p>
        <p>Name</p>
        <p>Price</p>
        <p>Measurement</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="product-list">
        {filteredData.map((product, index) => (
          <div className="product-item" key={product.id || index}>
            <img 
              src={`http://localhost:4000/uploads/${product.image}`} 
              alt={product.name || "Product Image"} 
              className="product-image" 
            />
          
            <p>{product.category}</p>
            <p>{product.name}</p>
            <p>{product.price}/-</p>
            <p>{product.weight}{product.measurement}</p>
            <Link to={`/updateproduct/${product._id}`} ><button>update</button></Link>
            <button onClick={()=> deleteProduct(product._id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;

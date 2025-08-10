import React, { useEffect, useRef, useState } from 'react'
import './AddProduct.css'
import icon_image from '../assets/icon image.png'

const AddProduct = () => {
  const [addproduct,setAddproduct] = useState({
    category:"",
    name:"",
    price:"",

    weight:"",
    measurement:"",
  })
  const [image,setImage] = useState(null)
  const fileInputRef = useRef(null)
  console.log(image)
  const handlechange = (e) => {
    setAddproduct({...addproduct,[e.target.name]:e.target.value})
  }


  const handlesubmit = async (event) => {
    event.preventDefault()

    // const product = {...addproduct,image};
    const formData = new FormData();
    formData.append("category", addproduct.category)
    formData.append("name",addproduct.name)
    formData.append("price",addproduct.price)
    formData.append("weight",addproduct.weight)
    formData.append("measurement",addproduct.measurement)
    formData.append("image",image)

    try{
    const response = await fetch("http://localhost:4000/api/workout/", {
      method: 'POST',
      body:formData
    })
  
    
    console.log(formData)
    const json = await response.json()

    if(response.ok){
      alert("Added")
      console.log("added" ,json)
      setAddproduct({
        category: "",
        name: "",
        price: "",
        weight: "",
        measurement: "",
      })
      setImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // document.getElementById("fileInput").value = "";
    }else{
      alert("Enter product")
      console.log("Enter product",)
    }

  } catch(error) {
    console.log("Error:",error)
    alert(`Error: ${error.message}`);
  }
  }
console.log(addproduct)
// console.log(image)

  return (
    <div className='addproduct'>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select onChange={handlechange}  name='category' value={addproduct.category}>
            <option value="">Select Category</option>
            <option value="Dairy product">Dairy product</option>
            <option value="Bakery">Bakery</option>
            <option value="Beverages">Beverages</option>
            <option value="Breakfast cereals">Breakfast cereals</option>
            <option value="Meat">Meat</option>
            <option value="Produce">Produce</option>
            <option value="Seafood">Seafood</option>
            <option value="Snacks">Snacks</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <p>name</p>
        <input type='text' onChange={handlechange} name="name" value={addproduct.name}/>
      </div>
      <div className='addproduct-itemfield'>
        <p>Price</p>
        <input type="number" onChange={handlechange} name="price" value={addproduct.price}/>
      </div>
      <div className='addproduct-itemfield-measurement'>
      <p>measurement</p>
      <input type="number" className='weight' onChange={handlechange} name="weight" value={addproduct.weight}/>
      <select onChange={handlechange} name='measurement' value={addproduct.measurement}>
        <option value="" >Select Measurement</option>
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="liter">liter</option>
        <option value="ml">ml</option>
        <option value="pc">pc</option>
      </select>
      </div>
      <div className='addproduct-itemfield'>
        {/* <label htmlFor='file-input'>
            <img src={} />

        </label> */}
        <p>Upload image</p>
        <input type="file" ref={fileInputRef} onChange={(e)=>setImage(e.target.files[0])} name="image" />
        <img src={image?URL.createObjectURL(image):icon_image} alt="" />
        
      </div>

      <button onClick={handlesubmit}>Add Product</button>
    </div>
  )
}

export default AddProduct

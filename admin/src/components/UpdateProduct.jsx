import React from 'react'
import { useEffect, useState } from 'react'
import './UpdateProduct.css'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {    
    const {id} = useParams()
    const [getproduct,setGetproduct] = useState({
        id:id,
        category:"",
        name:"",
        price:"",
        weight:"",
        measurement:"",
        image:"",
    })
    const [image,setImage] = useState(false)
    console.log(image)
    const navigate= useNavigate()
    
    const fetchInfo = async ()=>{
        try {
            const response = await fetch('http://localhost:4000/api'+id)
            const data = await response.json()
            setGetproduct({
                category:data.category || '',
                name:data.name || '',
                price:data.price || '',
                weight:data.weight || '',
                measurement:data.measurement || '',
                image:data.image || '',
            })
            setn
            // setImage(`http://localhost:4000/uploads/${data.image}`)
            console.log(data)
        }catch(error){
            console.error('no', error.message)
        }
        
    }
    
      const handlechange = (e) => {
            setGetproduct({...getproduct,[e.target.name]:e.target.value})
          }
        
    useEffect(()=>{
       fetchInfo()
    },[])


    const handlesubmit = async (e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("category",getproduct.category)
        formData.append("name",getproduct.name)
        formData.append("price",getproduct.price)
        formData.append("weight",getproduct.weight)
        formData.append("measurement",getproduct.measurement)
        
        if(image){
            formData.append("image",image)
        }

        try{
            const response = await fetch(`http://localhost:4000/api/workout/${id}`,{
                method:'PUT',
                body:formData
            })
            if(response.ok){
                console.log("updated")
                navigate('/listproduct')
            }else{
                console.log("fail")
            }
        }catch(error){
            console.log("no", error.message)
        }
    }
  return (
    <div className='updateproduct'>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select   name='category' value={getproduct.category} onChange={handlechange}>
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
        <input type='text'  name="name" value={getproduct.name} onChange={handlechange}/>
      </div>
      <div className='addproduct-itemfield'>
        <p>Price</p>
        <input type="number"  name="price" value={getproduct.price} onChange={handlechange} />
      </div>
      <div className='addproduct-itemfield-measurement'>
      <p>measurement</p>
      <input type="number" className='weight'  name="weight" value={getproduct.weight} onChange={handlechange} />
      <select  name='measurement' value={getproduct.measurement} onChange={handlechange} >
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
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} name="image" />
        <img src={image ?URL.createObjectURL(image):`http://localhost:4000/uploads/${getproduct.image}`} alt="" />
      </div>

      <button onClick={handlesubmit}>update Product</button>
    </div>
  )
}

export default UpdateProduct

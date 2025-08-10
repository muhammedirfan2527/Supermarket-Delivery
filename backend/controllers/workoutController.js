const Product = require("../models/productModel")
const multer = require('multer')

//get product
const getProduct = async (req,res) => {
    const product = await Product.find({}).sort({createAt:-1})
    res.status(200).json(product)
    // console.log(product)
}

//get single product
const getSingleProduct = async (req,res)=>{
    const {id} = req.params

    const product = await Product.findById(id) 

    if(!product){
        res.status(404).json({error:"no product"})
    }
    res.status(200).json(product)
}

// post product
const createProduct = async (req,res)=>{
    
    let lastproduct = await Product.findOne({}).sort({id:-1})
    const newId = lastproduct ? lastproduct.id + 1 : 1;
    
    // let image_filename = req.file? `${req.file.filename}`:null
    const image_filename = req.file ? req.file.filename : null;
    const {category,name,weight,image,price,measurement} = req.body
    try{
        const product = await Product.create({id:newId,category,name,image:image_filename,weight,price,measurement})
        res.status(200).json({message:"Added",product})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//update product
const updateProduct = async (req,res)=>{ 
    const {id} = req.params
    const { category, name, price, weight, measurement } = req.body;

  const updateFields = { category, name, price, weight, measurement };

  if(req.file){
    updateFields.image = req.file.filename;
  }
  try{
    const product = await Product.findOneAndUpdate({_id:id}, updateFields, {
        new:true,
    })

    if(!product){
        res.status(404).json({error:"no product"})
    }
    res.status(200).json(product)
}catch(error){
    res .status(500).json({error:error.message})
}
}

//delete product
const deleteProduct = async (req,res) =>{
    const {id} = req.params
    const product = await Product.findOneAndDelete({_id:id})

    if(!product){
        res.status(404).json({error:"no product"})
    }
    res.status(200).json(product)
}

module.exports = {createProduct,getProduct,getSingleProduct,updateProduct,deleteProduct}
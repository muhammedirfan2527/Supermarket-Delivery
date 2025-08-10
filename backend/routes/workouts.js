const express = require("express")
const router = express.Router()
const {createProduct,getProduct,getSingleProduct,updateProduct,deleteProduct} = require("../controllers/workoutController")
const multer = require('multer');   
  
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cd)=>{
        return cd(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({storage:storage})


router.get('/', getProduct)

router.get('/:id', getSingleProduct)

router.post('/', upload.single("image"), createProduct)

router.put('/:id',upload.single("image"), updateProduct)

router.delete('/:id' , deleteProduct)
  
module.exports =router   
const mongoose = require('mongoose')
// import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true
    },
    cartData:{
        type:Object,
        default:{}
    },
    favouriteData:{
        type:Object,
        default:{}
    }
},{timestamps:true})
 
module.exports = mongoose.model('User',userSchema)
// export default userModel
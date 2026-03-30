const mongoose = require('mongoose')

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
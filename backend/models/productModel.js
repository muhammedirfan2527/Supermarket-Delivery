const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id:{
        type : Number,
        required: true,
    },
    category:{
        type:String,
        required : true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true, 
    }, 
    price:{
        type:Number,
        required: true,
    },
    weight:{
        type:Number,
        required:true,
    },
    measurement:{
        type:String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
},{timestamps:true})

module.exports = mongoose.model('Product', productSchema)
const order = require('../models/orderModel') 
const user = require('../models/userModel')
const stripe = require('stripe')

// placing user order for frontend
const placeOrder = async (req,res)=>{
        try {
            const {userId, items, amount, address} = req.body
            const Order = await order.create({userId, items, amount, address})
            await user.findByIdAndUpdate(req.body.userId,{cartData:{}})
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error"})
        }
}

const userOrder = async (req,res) =>{
    try {
        const {userId} = req.body
        const orders = await order.find({userId})
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:"error"})
    }
}

// listing orders for admin panel
const listOrders = async (req,res) =>{
    try {
        const orders = await order.find({})
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:"error"})
    }
}

//api for update order status
const updateStatus = async (req,res)=>{
    try {
        const {orderId, status} = req.body
        await order.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Status updated"})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}

module.exports = {placeOrder, userOrder, listOrders, updateStatus}


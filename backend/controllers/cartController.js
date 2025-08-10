const userModel = require('../models/userModel')
const user = require('../models/userModel')

//add items to cart
const addToCart = async (req,res)=>{
    try {
        const { userId, itemId } = req.body;
        console.log(userId)
        console.log(itemId)

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        let userData = await user.findById(userId);
        console.log(userData)

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData || {}; // Ensure cartData is an object
        console.log(cartData)

        // Increment or initialize the item count
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await user.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// remove items from cart
const removeFromCart = async (req,res)=>{
    try {
        let userData = await user.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -=1
        } 
        await user.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message:"removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

// const allRemoveFromCart = async (req,res) =>{
//     try {
//         let userData = await user.findById(req.body.userId)
//         let cartData = await userData.cartData

//         await user.findByIdAndDelete(req.body.userId, {cartData})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"error"})
//     }
// }

const allRemoveFromCart = async (req, res) => {
    try {
        const { userId } = req.body;
        let userData = await user.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData
        console.log(cartData)
        if( cartData){
            cartData = {}
        }
        // else{
        //     console.log("error")
        // }

        await user.findByIdAndUpdate(userId, { cartData }, { new: true });
        // await user.findByIdAndUpdate(userId, { cartData: [] });

        res.json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error in allRemoveFromCart:", error);
        res.status(500).json({ success: false, message: "Error clearing cart" });
    }
};


//fetch cart data
const getCart = async (req,res) =>{
    try {
        let userData = await user.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

module.exports = {addToCart,removeFromCart, getCart, allRemoveFromCart}
const user = require('../models/userModel');

const WishList = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        let userData = await user.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let favouriteData = userData.favouriteData || {};

        // Ensure favouriteData is an object
        // if (typeof favouriteData !== "object" || Array.isArray(favouriteData)) {
        //     favouriteData = {};
        // }

        // Add the item to the object (key-value pair)
        if(favouriteData[itemId]){
            delete favouriteData[itemId]
        }else{
            favouriteData[itemId] = true; // You can set it to any relevant value
        }

        await user.findByIdAndUpdate(userId, { favouriteData }, { new: true });

        return res.json({ success: true, message: "Item added to wishlist" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getFavourite = async (req,res) =>{
    try {
        let userData = await user.findById(req.body.userId)
        let favouriteData = await userData.favouriteData
        res.json({success:true, favouriteData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

module.exports = {WishList, getFavourite}
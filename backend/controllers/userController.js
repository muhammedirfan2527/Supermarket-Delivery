// import userModel from "../models/userModel";
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// import validator from "validator"

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
      const user = await User.findOne({email})

      if(!user){
        return res.json({success:false, message:"User does not exist"})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
        return res.json({success:false,message:"onvalid credentials"})
      }

      const token = createToken(user._id)
      res.json({success:true,token, username: user.name})
    }catch (error){
      console.log(error)
      res.json({success:false, message:"Error in"})
    }
}

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
  
    try {
      // Check if email already exists
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Validate email and password
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
  
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Please enter a stronger password (min. 8 characters)" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      const user = await User.create({ name, email, password: hashedPassword });
  
      // Generate token
      const token = createToken(user._id);
  
      // Send a single response
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        user,
      });
    } catch (error) {
      // Send error response
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  

module.exports = {loginUser, registerUser}
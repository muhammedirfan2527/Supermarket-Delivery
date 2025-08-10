const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')
require('./config/passportConfig')
const session = require('express-session')

const workoutRoutes = require("./routes/workouts")
const  userRouter  = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')
const favouriteRoute = require('./routes/FavouriteRoute')
const authRoutes = require('./routes/authRoutes')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google", passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:5173",
    failureRedirect:"http://localhost:5173/login"
}))

app.get("/login/sucess", async(req,res)=>{
    console.log("reqqq", req.user)

    if(req.user){
        res.status(200).json({message:"user login", user:req.user})
    }else{
        res.status(400).json({message:"not authorized"})
    }
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Databse connected")
})
.catch((error)=>{
    console.log(error)
})
app.get('', (req, res)=>{
    res.send("Hii")
})

app.use(express.json())
app.use('/api/workout', workoutRoutes)
app.use('/api/user', userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/favourite', favouriteRoute)
// app.use('/auth', authRoutes)

app.listen(process.env.POST, ()=>{
    console.log("server is running") 
}) 

const express = require('express')
const {WishList, getFavourite} = require('../controllers/favouriteController')
const authMiddleware = require('../middleware/auth');

const favouriteRoute = express.Router()

favouriteRoute.post('/add', authMiddleware, WishList)
favouriteRoute.post('/get' , authMiddleware, getFavourite)

module.exports = favouriteRoute
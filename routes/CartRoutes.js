const express = require('express');
const router = express.Router()
const auth_middleware = require('../middleware/auth')

//Controller
const CartController = require('../controllers/CartController');

//Middleware


//Get all route

router.post('/cart', auth_middleware.verify_user_role, CartController.addProductToCart);

module.exports = {
    "router": router
}
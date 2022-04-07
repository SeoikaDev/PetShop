const express = require('express');
const router = express.Router()
const auth_middleware = require('../middleware/auth')

//Controller
const CartController = require('../controllers/CartController');

//Middleware


//Get all route

router.post('/cart', auth_middleware.verify_user_role, CartController.addProductToCart);

router.put('/cart', auth_middleware.verify_user_role, CartController.updateProductAmount);

router.delete('/cart', auth_middleware.verify_user_role, CartController.deleteProductFromCart);

module.exports = {
    "router": router
}
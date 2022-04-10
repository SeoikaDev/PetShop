const express = require('express');
const router = express.Router()
const auth_middleware = require('../middleware/auth')

//Controller
const OrderController = require('../controllers/OrderController');

//Middleware


//Get all route

router.post('/order', auth_middleware.verify_user_role, OrderController.addOrder);


module.exports = {
    "router": router
}
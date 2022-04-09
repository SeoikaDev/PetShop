const express = require('express');
const router = express.Router()
const auth_middleware = require('../middleware/auth')

//Controller
const HistoryController = require('../controllers/HistoryController');

//Middleware


//Get all route

router.post('/history', auth_middleware.verify_user_role, HistoryController.addProductToHistory);


module.exports = {
    "router": router
}
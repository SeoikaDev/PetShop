const express = require('express');
const router = express.Router()
const auth_middleware = require('../middleware/auth')

//Controller
const AuthController = require('../controllers/AuthController');

//Middleware


//Get all route

router.post('/sign-up', AuthController.sign_up)

router.post('/sign-in', AuthController.sign_in)

router.post('/send-mail', AuthController.send_mail)

router.post('/change-password', auth_middleware.verify_code, AuthController.change_password)

module.exports = {
    "router": router
}
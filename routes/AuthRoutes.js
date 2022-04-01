const express = require('express');
const router = express.Router()

//Controller
const AuthController = require('../controllers/AuthController');
//Middleware
const auth = require('../middleware/auth');

//Get all route

router.post('/sign-up', AuthController.sign_up)

router.post('/sign-in', AuthController.sign_in)

router.get('/welcome', auth, (req, res, next) => {
    res.send("Welcome");
})

module.exports = {
    "router": router
}
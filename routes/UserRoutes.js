const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController')

//Get all route

router.get('/users', UserController.getUsers)

module.exports = {
    "router": router
}
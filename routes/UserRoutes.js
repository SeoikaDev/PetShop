const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth_middleware = require('../middleware/auth')

//Get all route

router.get('/users', auth_middleware.verify_admin_role, UserController.getUsers)

router.post('/users/change-user-information', auth_middleware.verify_user_role, UserController.changeUserInformation)

module.exports = {
    "router": router
}
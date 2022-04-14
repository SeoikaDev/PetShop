const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth_middleware = require('../middleware/auth')

//Get all route

router.get('/users', auth_middleware.verify_admin_role, UserController.getUsers)

router.get('/users/current-user', auth_middleware.verify_user_role, UserController.getCurrentUser)

router.post('/users/change-user-information', auth_middleware.verify_user_role, UserController.changeUserInformation)

router.get('/users/:username'), auth_middleware.verify_admin_role, UserController.getUserByUsername

module.exports = {
    "router": router
}
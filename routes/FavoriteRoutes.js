const express = require('express');
const router = express.Router()
const auth_middleware = require('../middleware/auth')

//Controller
const FavoriteController = require('../controllers/FavoriteController');

//Middleware


//Get all route

router.post('/favorite', auth_middleware.verify_user_role, FavoriteController.addProductToFavorite);

router.delete('/favorite/:id', auth_middleware.verify_user_role, FavoriteController.deleteProductFromFavorite);

module.exports = {
    "router": router
}
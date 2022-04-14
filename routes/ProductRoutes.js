express = require('express');
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const auth_middleware = require('../middleware/auth')

//Get all route

router.get('/products', ProductController.getProducts)

router.get('/products/category', ProductController.getProductsByCategory)

router.get('/products/:productId', ProductController.getProductById)

router.post('/products', ProductController.addProduct)

router.put('/products/', auth_middleware.verify_admin_role, ProductController.updateProduct)

router.delete('/products/:id', auth_middleware.verify_admin_role, ProductController.deleteProduct)

module.exports = {
    "router": router
}
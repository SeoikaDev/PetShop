cexpress = require('express');
const router = express.Router()
const ServiceController = require('../controllers/ServiceController')
const auth_middleware = require('../middleware/auth')

//Get all route

router.get('/services', ServiceController.getServices)

router.get('/services/category', ServiceController.getServiceByCategory)

router.get('/services/:serviceId', ServiceController.getServiceById)

router.post('/services', auth_middleware.verify_admin_role, ServiceController.addService)

router.put('/services/', auth_middleware.verify_admin_role, ServiceController.updateService)

router.delete('/services/', auth_middleware.verify_admin_role, ServiceController.deleteService)

module.exports = {
    "router": router
}
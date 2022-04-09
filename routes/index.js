const auth_routes = require('./AuthRoutes')
const cart_routes = require('./CartRoutes')
const favorite_routes = require('./FavoriteRoutes')
const product_routes = require('./ProductRoutes')
const user_routes = require('./UserRoutes')
const history_routes = require('./HistoryRoutes')
const service_routes = require('./ServiceRoutes')

const express = require('express')

const router = express.Router();

const list_of_routers = [auth_routes, cart_routes, favorite_routes, product_routes,
    user_routes, history_routes, service_routes
]

list_of_routers.forEach(routes => router.use(routes.router))

module.exports = {
    router: router
}
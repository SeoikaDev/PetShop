const UserModel = require('../models/User')
const ServiceModel = require('../models/Service')
const jwt = require('jsonwebtoken')

//Add order
const addOrder = async(req, res, next) => {
    try {
        const { cart, type, total_price, payment_method, payment_account, receive_method, service } = req.body;
        const email = jwt.decode(req.header('Authorization').split(' ')[1]).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        if (type === "product") {
            const products = [];
            for (var i = 0; i < cart.length; i++) {
                products.push({
                    product: cart[i].product,
                    amount: cart[i].amount
                })
            }
            user.order.push({
                products: products,
                service: "",
                total_price: total_price,
                payment_method: payment_method,
                payment_account: payment_account,
                receive_method: receive_method
            })
            await UserModel.updateOne({ email: email }, { order: user.order })
            return res.json({ "status": "ok", "info": "To Order: product" })
        } else {
            const service = await ServiceModel.findOne({ _id: service }).lean();
            user.order.push({
                products: [],
                service: service,
                total_price: service.price,
                payment_method: payment_method,
                payment_account: payment_account,
                receive_method: receive_method
            })
            await UserModel.updateOne({ email: email }, { order: user.order })
            return res.json({ "status": "ok", "info": "To order: service" })
        }
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Get all orders
const getAllOrders = async(req, res, next) => {
    try {
        const users = await UserModel.find();
        const orders = [];
        for (var i = 0; i < users.length; i++) {
            if (users[i].order.length === 0) {
                continue;
            } else {
                orders.push({
                    orders: users[i].order,
                    email: users[i].email,
                    username: users[i].username
                });
            }
        }
        return res.json({ "status": "ok", "data": orders })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message });
    }
}

//Change order status
const changeOrderStatus = async(req, res, next) => {
    try {
        const { email, orderId, status } = req.body;
        const user = await UserModel.findOne({ email: email }).lean();
        for (var i = 0; i < user.order.length; i++) {
            if (user.order[i]._id === orderId) {
                user.order[i].status = status
            }
        }
        return res.json({ "status": "ok", "info": "Order status changed" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}



module.exports = {
    addOrder,
    getAllOrders,
    changeOrderStatus
}
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

//Save cart
const saveCart = async(req, res, next) => {
    try {
        const cart = req.body;
        const email = jwt.decode(req.header('Authorization').split(' ')[1]).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.cart = cart;
        await UserModel.updateOne({ email: email }, { cart: user.cart })
        return res.json({ "status": "ok", "info": "Cart saved" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Delete Cart
const deleteCart = async(req, res, next) => {
    try {
        const email = jwt.decode(req.header('Authorization').split(' ')[1]).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.cart = [];
        await UserModel.updateOne({ email: email }, { cart: user.cart })
        return res.json({ "status": "ok", "info": "Cart deleted" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

module.exports = {
    saveCart,
    deleteCart
}
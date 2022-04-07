const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

//Add product to cart
const addProductToCart = async(req, res, next) => {
    try {
        const { id, amount } = req.body;
        const email = jwt.decode(req.headers['x-access-token']).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        if (user.cart.length === 0) {
            user.cart.push({
                product: id,
                amount: amount
            })
            await UserModel.updateOne({ email: email }, user)
            return res.json({ "status": "ok", "info": "Added product to cart" })
        }
        for (var i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product == id) {
                user.cart[i].amount += amount;
                await UserModel.updateOne({ email: email }, user)
                break;
            }
            if (i === user.cart.length - 1) {
                user.cart.push({
                    product: id,
                    amount: amount
                })
                await UserModel.updateOne({ email: email }, user)
                break;
            }
        }
        return res.json({ "status": "ok", "info": "Added product to cart" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}


module.exports = {
    addProductToCart
}
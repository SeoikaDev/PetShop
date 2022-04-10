const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

//Add product to cart
const addProductToCart = async(req, res, next) => {
    try {
        const { id, amount } = req.body;
        const email = jwt.decode(req.header('Authorization').split(' ')[1]).email;
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

//Update product amount
const updateProductAmount = async(req, res, next) => {
    try {
        const { status, id, amount } = req.body;
        const email = jwt.decode(req.header('Authorization').split(' ')[1]).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        for (var i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product == id) {
                if (status === 'add') {
                    user.cart[i].amount += amount;
                    await UserModel.updateOne({ email: email }, user)
                    break;
                } else {
                    user.cart[i].amount -= amount;
                    await UserModel.updateOne({ email: email }, user)
                    break;
                }
            }
        }
        return res.json({ "status": "ok", "info": "Updated amount of product" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Delete product from cart
const deleteProductFromCart = async(req, res, next) => {
    try {
        const { id } = req.body;
        const email = jwt.decode(req.header('Authorization').split(' ')[1]).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.cart = user.cart.filter(i => i.product == id);
        await UserModel.updateOne({ email: email }, user)
        return res.json({ "status": "ok", "info": "Removed product from cart" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

module.exports = {
    addProductToCart,
    updateProductAmount,
    deleteProductFromCart
}
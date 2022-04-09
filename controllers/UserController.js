const { json } = require('express/lib/response');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken')

const getUsers = async(req, res, next) => {
    try {
        const users = await UserModel.find().populate('cart.product').populate('favorite.product')
            .populate('history.product');
        return res.json({ "status": "ok", "data": users })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

const getCurrentUser = async(req, res, next) => {
    try {
        const email = jwt.decode(req.headers['x-access-token']).email;
        const user = await UserModel.findOne({ email: email }).populate('cart.product')
            .populate('favorite.product').populate('history.product')
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        return res.json({ "status": "ok", "data": user })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

const changeUserInformation = async(req, res, next) => {
    try {
        const { full_name, dob, phone_number } = req.body;
        const email = jwt.decode(req.headers['x-access-token']).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.full_name = full_name;
        user.dob = dob;
        user.phone_number = phone_number;
        await UserModel.updateOne({ email: email }, user);
        return res.json({ "status": "ok", "info": "User information changed" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }

}

module.exports = {
    getUsers,
    changeUserInformation,
    getCurrentUser
}
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

//Add product to favorite
const addProductToHistory = async(req, res, next) => {
    try {
        const { id } = req.body;
        const email = jwt.decode(req.headers['x-access-token']).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.history = user.history.filter(e => e.product != id);
        await UserModel.updateOne({ email: email }, { history: user.history })
        user.history.push({
            product: id,
            date: Date.now()
        })
        await UserModel.updateOne({ email: email }, user)
        return res.json({ "status": "ok", "info": "Added product to history" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}


module.exports = {
    addProductToHistory,
}
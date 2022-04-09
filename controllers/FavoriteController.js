const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

//Add product to favorite
const addProductToFavorite = async(req, res, next) => {
    try {
        const { id } = req.body;
        const email = jwt.decode(req.headers['x-access-token']).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.favorite.push({
            product: id,
            date: Date.now()
        })
        await UserModel.updateOne({ email: email }, user)
        return res.json({ "status": "ok", "info": "Added product to favorite" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}


//Delete product from favorite
const deleteProductFromFavorite = async(req, res, next) => {
    try {
        const { id } = req.body;
        const email = jwt.decode(req.headers['x-access-token']).email;
        const user = await UserModel.findOne({ email: email }).lean()
        if (!user) {
            return res.json({ "status": "error", "error": "Could not found this user" });
        }
        user.favorite = user.favorite.filter(i => i.product == id);
        await UserModel.updateOne({ email: email }, user)
        return res.json({ "status": "ok", "info": "Removed product from favorite" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

module.exports = {
    addProductToFavorite,
    deleteProductFromFavorite
}
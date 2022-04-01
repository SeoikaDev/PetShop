const ProductModel = require('../models/Product')

//Get all products
const getProducts = async(req, res, next) => {
    try {
        const products = await ProductModel.find();
        return res.json(products)
    } catch (error) {
        res.status(404).json(error.message);
    }
}

//Get product by id
const getProductById = async(req, res, next) => {
    try {
        const product = await ProductModel.findById()
    } catch (error) {
        return res.status(404).json(error.message);
    }
}
module.exports = {
    getProducts
}
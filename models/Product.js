const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    benefit: String,
    bought: Number,
    category: {
        id: Number,
        name: String
    },
    description: String,
    discount: Number,
    how_to_use: String,
    image: String,
    name: String,
    price: Number,
    stock: Number
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);
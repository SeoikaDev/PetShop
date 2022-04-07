const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    benefit: { type: String, required: false, default: "" },
    bought: { type: String, required: false, default: "" },
    category: {
        id: Number,
        name: String
    },
    description: { type: String, required: false, default: "" },
    discount: { type: Number, required: false, default: 0 },
    how_to_use: { type: String, required: false, default: 0 },
    image: { type: String, required: true, default: "" },
    name: { type: String, required: true, default: "" },
    price: { type: Number, required: true, default: 0 },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);
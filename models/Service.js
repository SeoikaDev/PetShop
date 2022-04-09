const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "" },
    type: { type: String, required: true, default: "" },
    price: { type: Number, required: true, default: 0 },
}, { collection: 'services' });

module.exports = mongoose.model('Service', ServiceSchema);
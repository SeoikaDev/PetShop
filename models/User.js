const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: true },
    verification_code: { type: String, required: false },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    full_name: { type: String, required: false, default: "" },
    dob: {
        type: Date,
        required: false,
        default: Date.now()
    },
    phone_number: { type: String, required: false, default: "" },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        amount: { type: Number, default: 0 }
    }, { _id: false }]
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
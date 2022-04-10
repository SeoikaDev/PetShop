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
    }, { _id: false }],
    favorite: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    history: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    order: [{
        products: [{
            product: {
                type: String
            },
            amount: { type: Number, default: 0 }
        }, {
            default: []
        }],
        service: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            default: Date.now()
        },
        total_price: {
            type: Number,
            default: 0
        },
        payment_method: {
            type: String,
            default: "paypal"
        },
        payment_account: {
            type: String,
            default: ""
        },
        receive_method: {
            type: String,
            default: "at store"
        },
        status: {
            type: String,
            default: "Processed. Waiting for receiving"
        }
    }]
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
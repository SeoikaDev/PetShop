const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: true },
    verification_code: { type: String, required: false },
    role: {
        type: String,
        required: true
    }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
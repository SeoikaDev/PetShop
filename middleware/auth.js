const { JsonWebTokenError } = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

const verify_user_role = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).send("Token Expired")
        } else if (error instanceof JsonWebTokenError) {
            return res.status(401).send("Invalid Token");
        }
    }
    const decoded = jwt.decode(token);
    if (decoded.role === 'user' || decoded.role === 'admin') {
        return next();
    }
    return res.status(400).send("Invalid Role");
}

const verify_admin_role = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).send("Token Expired")
        } else if (error instanceof JsonWebTokenError) {
            return res.status(401).send("Invalid Token");
        }
    }
    const decoded = jwt.decode(token);
    if (decoded.role === 'admin') {
        return next();
    }
    return res.status(400).send("Invalid Role");
}

const verify_code = async(req, res, next) => {
    const { code, email } = req.body
    const user = await UserModel.findOne({ email: email }).lean();
    if (email === null || email === "") {
        return res.json({ status: "error", error: "Email can not be empty or null" })
    }
    if (!user) {
        return res.json({ status: "error", error: "Invalid username or email" })
    }
    if (code === user.verification_code) {
        await UserModel.updateOne({ email: email }, {
            $set: { verification_code: "" }
        });
        return next();
    } else {
        return res.json({ status: "error", info: "Verification code is not correct. Please try again" })
    }
}

module.exports = {
    verify_user_role,
    verify_admin_role,
    verify_code
}
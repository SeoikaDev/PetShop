const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const sign_up = async(req, res, next) => {
    const { username, password, email } = req.body
    const encPassword = await bcrypt.hash(password, 10)
    try {
        const user = await UserModel.create({
            username: username,
            password: encPassword,
            email: email
        });
        return res.send(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: "error", error: "Username or email is already in use" })
        } else {
            res.status(404).send(error.message)
        }
    }
}

const sign_in = async(req, res, next) => {
    const { username, password, email } = req.body;
    const user = await UserModel.findOne({
        username: username,
        email: email
    }).lean();
    if (!user) {
        return res.json({ status: "error", error: "Invalid username or password" })
    }
    console.log(user)
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "12s" })
        return res.json({ status: "ok", data: token })
    }
}


module.exports = {
    sign_up,
    sign_in
}
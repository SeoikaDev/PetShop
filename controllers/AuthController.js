const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const node_mailer = require('nodemailer')
const verification_generator = require('../utils/VerificationCodeGenerator')

const sign_up = async(req, res, next) => {
    const { username, password, email, role } = req.body
    const encPassword = await bcrypt.hash(password, 10)
    try {
        const user = await UserModel.create({
            username: username,
            password: encPassword,
            email: email,
            role: role
        });
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15d" })
        return res.json({ status: "ok", info: "create user successfully", token: token });
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: "error", error: "Username or email is already in use" })
        } else {
            return res.json({ status: "error", error: error.message })
        }
    }
}

const sign_in = async(req, res, next) => {
    const { username, password, email, role } = req.body;
    const user = await UserModel.findOne({
        $or: [{
            username: username
        }, {
            email: email
        }]
    }).lean();
    if (!user) {
        return res.json({ status: "error", error: "Invalid username or email" })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15d" })
        return res.json({ status: "ok", data: token })
    } else {
        return res.json({ status: "error", error: "Invalid username or password" })
    }
}

const send_mail = async(req, res, next) => {
    const { email } = req.body
    const user = await UserModel.findOne({
        email: email
    }).lean();
    if (email === null || email === "") {
        return res.json({ status: "error", error: "Email can not be empty or null" })
    }
    if (!user) {
        return res.json({ status: "error", error: "Invalid username or email" })
    }
    var verification_code = verification_generator.makeID(6)

    var transporter = node_mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER_EMAIL,
            pass: process.env.MAIL_SENDER_PASSWORD
        }
    })

    var mail_options = {
        from: process.env.MAIL_SENDER_EMAIL,
        to: email,
        subject: "noreply : Verification Code from PetShop.com",
        html: "Your verification code is: <h1>" + verification_code + "</h1>"
    }

    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            return res.json({ status: "error", error: error.message })
        } else {
            return res.json({ status: "ok", info: "Email sent to " + email + " successfully." })
        }
    })
    await UserModel.updateOne({ email: email }, {
        $set: { verification_code: verification_code }
    })
}



const change_password = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email }).lean();
    if (email === null || email === "") {
        return res.json({ status: "error", error: "Email can not be empty or null" })
    }
    if (!user) {
        return res.json({ status: "error", error: "Invalid username or email" })
    }
    const encPassword = await bcrypt.hash(password, 10)
    await UserModel.updateOne({ email: email }, {
        $set: { password: encPassword }
    })
    return res.json({ "status": "ok", "info": "Change password successfully" })
}


module.exports = {
    sign_up,
    sign_in,
    send_mail,
    change_password
}
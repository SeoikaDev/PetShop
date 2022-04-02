const UserModel = require('../models/User');

const getUsers = async(req, res, next) => {
    try {
        const users = await UserModel.find();
        res.send(users);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = {
    getUsers
}
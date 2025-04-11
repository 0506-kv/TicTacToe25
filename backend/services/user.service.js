const userModel = require('../models/user.model');

module.exports.createUser = async ({
    username, email, password
}) => {
    if (!username) {
        throw new Error('username not given');
    }
    if (!email) {
        throw new Error('email not given');
    }
    if (!password) {
        throw new Error('password not given');
    }
    const user = userModel.create({
        username,
        email,
        password
    })
    return user;
}
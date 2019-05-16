const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    sex: { type: String, default: 'Male' },
    userID: { type: String, unique: true, index: true },
    userPW : { type: String }
})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel

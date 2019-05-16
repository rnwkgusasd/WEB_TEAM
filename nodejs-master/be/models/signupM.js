const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    age: { type: Number, default: 1 },
    userID: { type: String, unique: true, index: true },
    userPW : { type: String }
})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel

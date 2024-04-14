var mongoose = require('mongoose')
const { userService }  = require('../model/users')
const User = require('../model/users')

// Returns a list of all users
module.exports.list = () => {
    return User
        .find()
        .sort({nome: 1})
        .exec()
}

// Inserts a new user
module.exports.insert = (user) => {
    if ((User.find({_id : user._id}).exec()).length != 1){
        var newUser = new User(user)
        return newUser.save()
    }
}

// Delete a user
module.exports.delete = (id) => {
    return User.findByIdAndDelete({_id: id}).exec()
}

// Update a user
module.exports.update = (id, user) => {
    return User.findByIdAndUpdate(id, user, {new: true}).exec()
}
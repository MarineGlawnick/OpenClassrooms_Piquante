const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// creation of User model to add to the data base
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
})

// prevent  from using the same email address twice to register
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
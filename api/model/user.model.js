const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: String,
    address: String,
    gender: String,
    bio: String,
    email: String,
    phone: String,
    password: String,
    userID: String,
    image: Array,
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User


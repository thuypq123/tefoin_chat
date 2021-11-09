const mongoose = require('mongoose');
const Login = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('login',Login);
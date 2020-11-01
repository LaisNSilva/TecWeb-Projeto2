var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projetoNEM');

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    senha: String,
    preferencias: Array

}, { collection: 'usercollection' }
);
module.exports = { Mongoose: mongoose, UserSchema: userSchema }

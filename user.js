const mongoose = require("./db.js");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
    })




UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
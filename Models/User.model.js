const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    srcode: {
        type: Number,
        required: true
    }
});

// to create user from UserSchema
const User = mongoose.model('user', UserSchema);
module.exports = User;
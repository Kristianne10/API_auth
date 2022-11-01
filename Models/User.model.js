const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

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


// called after saving a user
// use function and remove => to use .this
UserSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
        } catch (error) {
        next(error)
    }

})


// to create user from UserSchema
const User = mongoose.model('user', UserSchema);
module.exports = User;
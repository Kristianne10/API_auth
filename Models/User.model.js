const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const ProgramSchema = new mongoose.Schema({
    progName: String,
    prog: mongoose.SchemaTypes.ObjectId,

});

const DepartmentSchema = new mongoose.Schema({
    deptName: String,
    dept: mongoose.SchemaTypes.ObjectId,
    program: ProgramSchema
});
// const Department = mongoose.model('department', DepartmentSchema);
// module.exports = Department;

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
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    department:
        DepartmentSchema,
    createdAt: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    verified : {type: Boolean, default:false}


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

UserSchema.methods.isValidPassword = async function (password) {
    try{
       return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.err(error);
        throw error
    }
}

// to create user from UserSchema
const User = mongoose.model('user', UserSchema);
module.exports = User;

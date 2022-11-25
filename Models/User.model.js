const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ProgramSchema = new mongoose.Schema({
    progName: String,
    prog: mongoose.SchemaTypes.ObjectId,

});
const Program = mongoose.model('program', ProgramSchema);
module.exports = Program;

const DepartmentSchema = new mongoose.Schema({
    deptName: String,
    dept: mongoose.SchemaTypes.ObjectId,
    program: ProgramSchema
});
const Department = mongoose.model('department', DepartmentSchema);
module.exports = Department;

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

UserSchema.methods.isValidPassword = async function (password) {
    try{
       return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}


// to create user from UserSchema
const User = mongoose.model('user', UserSchema);
module.exports = User;




const Form_Schema = new  mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    }
})
const Form = mongoose.model('form', Form_Schema);
module.exports = Form;


filledForms_Schema = new mongoose.Schema({
    filledDate: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    },
    formIDs: [{type:mongoose.Schema.ObjectId,ref: 'form'}]
})

const CreatedForms_Schema = new mongoose.Schema({
    formIDs: {type:mongoose.Schema.ObjectId,ref: 'form'}
})
const CreatedForm = mongoose.model('createdform', CreatedForms_Schema);
module.exports = CreatedForm;


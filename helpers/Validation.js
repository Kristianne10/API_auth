const Joi = require('joi');

// for register schema
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
});

// export Schema

module.exports = {
    authSchema
}



// const loginSchema = Joi.object({
//     email: Joi.string().email().lowercase().required(),
//     password: Joi.string().min(8).required(),
// });


// module.exports = {
//     loginSchema
// }


// name: Joi.string().required(),
// email: Joi.string().email().lowercase().required(),
// password: Joi.string().min(8).required(),
// srcode: Joi.number().required(),


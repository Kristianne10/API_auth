const Joi = require('joi');

// can have multiple schema

const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    srcode: Joi.number().required(),
})

// export authSchema
module.exports = {
    authSchema
}
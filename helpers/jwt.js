const JWT = require('jsonwebtoken')
const createError = require('http-errors')

// export functions
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "1h",
                issuer: 'formana.com',      //Issuer takes ANY string
                audience: userId,          // audience of this token
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return reject(createError.InternalServerError())
                }
                   
               return resolve(token)  
            })
        })
    },
}

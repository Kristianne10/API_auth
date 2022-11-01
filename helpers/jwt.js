const JWT = require('jsonwebtoken')
const createError = require('http-errors')

// export functions
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = "Some secret"
            const options = {
                expiresIn: "1h",
                issuer: 'formana.com',
                audience: userId    // audience of this token
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
}
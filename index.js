/* MODULES
npm install express 
            morgan   | morgan logs the request inside the console
            htt-errors
            dotenv 
            nodemon
            mongoose
            bcrypt
            jsonwebtoken
   SET PORT
   sET PORT=


ROUTES

http://localhost:3000
http://localhost:3000/api/ifRouteDeoesntExist
http://localhost:3000/api/formanaAuth/register
http://localhost:3000/api/formanaAuth/login
http://localhost:3000/api/formanaAuth/logout
http://localhost:3000/api/formanaAuth/refresh-token
http://localhost:3000/api/Form/forms
http://localhost:3000/api/Form/ListOfForms
http://localhost:3000/api/FilledForm/filledForm
http://localhost:3000/api/Formana-Department/Department
http://localhost:3000/api/Form/input
http://localhost:3000/api/Form/answer

*/
const cors = require("cors");

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/DB');
const { verifyAccessToken } = require('./helpers/jwt');

const AuthRoute = require('./Routes/Auth.route');
const FormRoute = require('./Routes/Form.route');
const DeptRoute = require('./Routes/Dept.route');
const FilledRoute = require('./Routes/Filled_Form.route');

// OTP
const OTPRoutes = require("./OTP/OTP.route");

// email
const EmailVerificationRoutes = require("./OTP/Email.verification/email.route");


// initialize the app
const app = express();
app.use(morgan('dev'))   // using  morgan module

// parse the request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// use verifyAcessToken as a middleware of Access Token
// we provide the access token in the request header
app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send("Hellooooooooo");
})

app.use(cors());

// user authentication
app.use('/api/formanaAuth', AuthRoute);

// forms
app.use('/api/Form', FormRoute);
app.use('/api/Formana-Department', DeptRoute);
app.use('/api/FilledForm', FilledRoute);

// otp route
app.use("/api/otp", OTPRoutes);
// email verification process using the otp system
app.use("/api/email_verification", EmailVerificationRoutes);




// all the routes that is not handle, will be handle by this code
app.use(async(req, res, next) => {
    next(createError.NotFound('route does not exist'))    
});
// ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT);
})
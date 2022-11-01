/* MODULES
npm install --save express 
                   morgan   | morgan logs the request inside the console
                   htt-errors
                   dotenv 
                   nodemon
   SET PORT
   sET PORT=

*/

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

// import Auth.route
const AuthRoute = require('./Routes/Auth.route');

// initialize the app
const app = express();

app.get('/', async (req, res, next) => {
    res.send("Hello");
});

app.use('/formanaAuth', AuthRoute);

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
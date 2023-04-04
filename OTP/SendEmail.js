const nodemailer = require("nodemailer");



const { AUTH_EMAIL, AUTH_PASS} = process.env;
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    service: 'outlook', 
    port: "587",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS
    },
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false
    }
});

// test transporter
transporter.verify((error, success) => {
    if(error){
        console.log(error);
    }else{
        console.log("Ready for messages");
        console.log(success);
    }
});


const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        console.log("try ulit");
        throw(error);
    }
};

module.exports = sendEmail;
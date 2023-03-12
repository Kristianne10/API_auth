const OTP = require("./OTP.model");
const generateOTP = require("./GenerateOTP");
const sendEmail = require("./SendEmail");
const {hashData} = require("./hashData");
const {AUTH_EMAIL} = process.env;

const sendOTP = async({email,subject,message,duration = 1}) => {
    try {
        // check if the values are not empty
        if (!(email && subject && message)){
            throw Error("Provide values for email, subject, and message");
        }

        // delete any old record
        await OTP.deleteOne({email});

        // generate pin
        const generatedOTP = await generateOTP();

        // send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style"=color:tomato; font-size:25px; letter-spacing: 2px;"><b>${generatedOTP}</b></p><p>This is code <b>expires in ${duration} hour(s)</b>.</p>`,
        };
        await sendEmail(mailOptions);

        // save otp record
        const hashedData = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });
        
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

    } catch (error) {
        throw error;
    }
};

module.exports = {sendOTP};
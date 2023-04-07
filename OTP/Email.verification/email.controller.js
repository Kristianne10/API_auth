const User = require("./../OTP.model");
const {sendOTP} = require("./../OTP.controller");

const sendVerificationOTPEmail = async (email) => {
    try {

        // check if an account exists
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            throw Error("There's no account for the provided email.");
        }

        //otherwise
        const otpDetails = {
            email,
            subject: "Email Verification.",
            message: "Verify your email with the code below.",
            duration: 1,
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;

    } catch (error) {
        throw error;
    }
};

module.exports = {sendVerificationOTPEmail};
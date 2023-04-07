// const User = require("./../OTP.model");
const User = require("./../../Models/User.model");
const {sendOTP, verifyOTP, deleteOTP} = require("./../OTP.controller");


const verifyUserEmail = async ({email,otp}) => {
    try {
        const validOTP = await verifyOTP({email,otp});
        if (!validOTP) {
            throw Error("Invalid code passed. Check your email.");
        }

        // update the user record after successful verification to show verified
        await User.updateOne({email}, {verified: true});

        await deleteOTP(email);
        return;

    } catch (error) {
        throw error;
    }
};


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

module.exports = {sendVerificationOTPEmail, verifyUserEmail};
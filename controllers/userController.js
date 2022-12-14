const User = require("../models/userModel");
const { EMAIL_REGEX } = require("../shared.js/constants");
const { encryptPassword, decryptPassword } = require("../utilities/crypto");
const { generateJWT } = require("../utilities/helper");
const { onSuccess, onError, badrequest } = require("../utilities/responseManager")

exports.login = async(req, res) => {
    const { email, password } = req.body;
    if (email.trim() != '' && password.trim() != '' && EMAIL_REGEX.test(email) && password.length > 6) {
        let userData = await User.findOne({ email });
        if(userData !== null) {
            const pass = decryptPassword(userData.password);
            if(password === pass) {
                const token = generateJWT(userData._id);
                return onSuccess("Login Successfull", {token}, res);
            } else {
                return badrequest({ message: "Invalid Credentials." }, res);
            }
        } else {
            return badrequest({ message: "Invalid Credentials." }, res);
        }
    } else {
        return badrequest({ message: "Invalid Credentials." }, res);
    }
}

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (email.trim() != '' && password.trim() != '' && EMAIL_REGEX.test(email) && password.length > 6) {
        let isUser = await User.find({ email });
        if (isUser.length > 0) {
            return onSuccess("User Already Exists.", { email }, res);
        } else {
            try {
                const cryptPassword = await encryptPassword(password);
                const user = await User.create({ email, password: cryptPassword });
                return onSuccess("Registration Successfull.", user, res);

            } catch (error) {
                console.log("Registration Error >> ");
                console.log(error);
                return onError({ message: "Registration Failed." }, res);
            }
        }
    } else {
        return badrequest({ message: "Invalid Data To Register." }, res);
    }
}

exports.getProfile = (req, res) => {
    onSuccess("sucess", {}, res);
}

exports.setProfile = (req, res) => {

}

exports.setProfileImage = (req, res) => {

}
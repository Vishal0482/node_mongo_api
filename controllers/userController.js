const User = require("../models/userModel");
const user = require("../routes/userRoute");
const { EMAIL_REGEX, USER_TYPES, IMAGE_TYPES } = require("../shared/constants");
const { encryptPassword, decryptPassword } = require("../utilities/crypto");
const { generateJWT } = require("../utilities/helper");
const { onSuccess, onError, badrequest } = require("../utilities/responseManager");
const { uploadImageToFirebase } = require("../utilities/uploadImage");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (email.trim() != '' && password.trim() != '' && EMAIL_REGEX.test(email) && password.length > 6) {
        let userData = await User.findOne({ email });
        if (userData !== null) {
            const pass = decryptPassword(userData.password);
            if (password === pass) {
                const token = generateJWT(userData._id);
                return onSuccess("Login Successfull", { token }, res);
            } else {
                return badrequest({ message: "Invalid Credentials.1" }, res);
            }
        } else {
            return badrequest({ message: "Invalid Credentials.2" }, res);
        }
    } else {
        return badrequest({ message: "Invalid Credentials.3" }, res);
    }
}

exports.register = async (req, res) => {
    const { email, password, type } = req.body;
    if (email.trim() != '' && password.trim() != '' && EMAIL_REGEX.test(email) && password.length > 6 && USER_TYPES.includes(type)) {
        let isUser = await User.find({ email });
        if (isUser.length > 0) {
            return onSuccess("User Already Exists.", { email }, res);
        } else {
            try {
                const cryptPassword = await encryptPassword(password);
                const user = await User.create({ email, password: cryptPassword, type });
                return onSuccess("Registration Successfull.", {_id: user._id}, res);

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

exports.getProfile = async (req, res) => {
    try {
        const data = await User.findById(req.token.id).select('-password');
        if (data) {
            return onSuccess("Profile Fetched Successfully.", data, res);
        }
    } catch (error) {

    }
}

exports.setProfile = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.token.id, req.body);
        const data = await User.findById(req.token.id).select('-password');
        if (data) {
            return onSuccess("Profile Set Successfull.", data, res);
        }
        return badrequest({ message: "Unable To Update" }, res);
    } catch (error) {
        return badrequest({ message: "Something went Wrong." }, res);
    }

}

exports.setProfileImage = async (req, res) => {
    try {
        const size = 1; // size in MB
        const file = req.file;
        if(file) {
            if(IMAGE_TYPES.includes(file.mimetype)) {
                if(file.size < size * 1024 * 1024) {
                    const imageUrl = await uploadImageToFirebase(req.token.id, file);
                    if(imageUrl !== 0) {
                        await User.findByIdAndUpdate(req.token.id, { pic: imageUrl });
                        const updatedData = await User.findById(req.token.id);
                        return onSuccess("Image uploaded Successfull.", updatedData , res);
                    } else {
                        return badrequest({ message: "Error Occured While Uploading."}, res);
                    }
                } else {
                    return badrequest({ message: "File size is greater than "+size }, res);
                }
            } else {
                return badrequest({ message: "Invalid File Formate." }, res);
            }
        } else {
            return badrequest({ message: "No File Found." }, res);
        }
    } catch (error) {
        return badrequest({ message: "Something Went Wrong." }, res);
    }
}

exports.getUserList = async (req, res) => {
    try {
        const data = await User.find();
        return onSuccess("User List Fetched Successfully.", data, res);
    } catch (error) {
        return badrequest({ message: "Something Went Wrong." }, res);
    }
}
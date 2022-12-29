const { User, userValidateSchema } = require("../models/userModel");
const { EMAIL_REGEX, USER_TYPES } = require("../shared/constants");
const { encryptPassword, decryptPassword } = require("../utilities/crypto");
const { generateJWT } = require("../utilities/helper");
const { onSuccess, onError, badrequest } = require("../utilities/responseManager");

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
                return onSuccess("Registration Successfull.", { _id: user._id }, res);

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
        const value = await userValidateSchema.validateAsync(req.body);
        console.log("Value >> ", value);
    } catch (error) {
        console.log("Error >> ",error);
        return badrequest({ message: error.message }, res);
    }
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
        if (req.imageUrl !== null) {
            await User.findByIdAndUpdate(req.token.id, { pic: req.imageUrl });
            const updatedData = await User.findById(req.token.id);
            return onSuccess("Image uploaded Successfull.", updatedData, res);
        } else {
            return badrequest({ message: "Image URL Not Found." }, res);
        }
    } catch (error) {
        return badrequest({ message: "Something Went Wrong." }, res);
    }
}

exports.getUserList = async (req, res) => {
    try {
        const { page, limit, sort, search, select } = req.body;
        const filterArray = [];
        for (const key in search) {
            filterArray.push({ [key]: { '$regex': new RegExp(search[key], "i") } });
        }

        const removePassword = select?.filter(ele => {
            if (ele.toLowerCase() !== "password") {
                return ele;
            }
        })
        const selectString = removePassword?.join(" ");
        const filterCondition = filterArray.length > 0 ? { $or: filterArray } : {};

        const sortObject = {};
        Object.entries(sort || {}).map((value) => {
            if (value[0] === 'password') return null;
            sortObject[value[0]] = (value[1] === "asc" ? 1 : -1);
        });

        // console.log("Filter >> ",filterCondition);
        // console.log("Sort >> ",sortObject);
        // console.log("Selected >> ",selectString);

        // ?? - nullise opreator assign second value if first is null or undefiend.
        await User.paginate(
            filterCondition,
            {
                page,
                limit: limit ?? 10,
                sort: sortObject,
                select: selectString || '-password'
            }).then(data => {
                return onSuccess("User List Fetched Successfully.", data, res);
            });
    } catch (error) {
        console.log(error)
        return badrequest({ message: "Something Went Wrong." }, res);
    }
}
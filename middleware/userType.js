const User = require("../models/userModel");
const { USER_TYPES } = require("../shared.js/constants");
const { badrequest } = require("../utilities/responseManager");

exports.userType = async(req, res, next) => {
    const data = await User.findById(req.token.id);
    if(data.type === USER_TYPES[0]) {
        next();
    } else {
        return badrequest({message: "Only Admin Can access."}, res);
    }
}
const jwt = require("jsonwebtoken");

exports.generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {});
}

exports.generateOTP = (length) => {
    const digits = "0123456789";
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}
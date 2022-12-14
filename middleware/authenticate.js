const jwt = require("jsonwebtoken");
const { unauthorisedRequest } = require("../utilities/responseManager");

exports.authenticate = async(req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
            if(err) {
                return unauthorisedRequest(res);
            } else {
                req.token = auth;
            }
        });
        next();
    } else {
        return unauthorisedRequest(res);
    }
}
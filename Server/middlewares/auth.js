const jwt = require('jsonwebtoken')
const ApiError = require('../utils/apiError')
const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWTSECRETKEY, (err, decodedToken) => {
            if (err) {
                next(new ApiError('Unauthorize', 401));
            }
            else {
                req.user = decodedToken;
                next();
            }
        })
    }
    else {
        next(new ApiError('Unauthorize', 401));
    }
}
module.exports = { auth }
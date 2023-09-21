const fs = require('fs')
const path = require('path');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');
const jwt = require('jsonwebtoken');

const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Profiles } = databaseContent;

if (!Profiles) {
    Profiles = [];
}
//login
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError('Email and password are required', 400));
    }

    const lowercaseEmail = email.toLowerCase();

    const user = Profiles.find(profile => profile.email.toLowerCase() === lowercaseEmail);
    if (!user) {
        return next(new ApiError('Incorrect email or password', 404));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return next(new ApiError('Incorrect email or password', 401));
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWTSECRETKEY, {
        expiresIn: '48h',
    });
    res.cookie('token', token);
    res.status(200).json({ message: 'Login successful', user });
});

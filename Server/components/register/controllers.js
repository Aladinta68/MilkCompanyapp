const fs = require('fs')
const path = require('path');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');
const { v4: uuidv4 } = require('uuid');

const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Profiles } = databaseContent;

if (!Profiles) {
    Profiles = [];
}

//register
exports.addProfile = asyncHandler(async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return next(new ApiError('All fields are required', 400));
    }
    const lowercaseEmail = email.toLowerCase();
    const emailExists = Profiles.some(profile => profile.email === lowercaseEmail);
    if (emailExists) {
        return next(new ApiError('User already exists with this email'));
    }
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newProfile = {
        id,
        first_name,
        last_name,
        email: lowercaseEmail,
        password: hashedPassword,
    };
    await Profiles.push(newProfile);
    databaseContent.Profiles = Profiles;
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.status(201).json({ results: 'Profile added successfully', data: newProfile });
});
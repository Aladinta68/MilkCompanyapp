const fs = require('fs')
const path = require('path');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');

const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Profiles } = databaseContent;

if (!Profiles) {
    Profiles = [];
}
//get all profiles
exports.getProfiles = asyncHandler(async (req, res) => {
    const currentid = req.user;
    const Profilesdata = Profiles.map(profile => ({
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
    }));

    res.status(200).json({ results: Profilesdata.length, data: Profilesdata, currentid });
});
//get one profile by id
exports.getoneProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const profile = await Profiles.find(profile => profile.id === id);

    if (!profile) {
        return next(new ApiError('Profile not found', 404));
    }
    const OneProfiledata = {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
    };
    res.status(200).json({ data: OneProfiledata });
});
// Update profile route
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, email, oldPassword, newPassword } = req.body;
    const profileIndex = Profiles.findIndex(profile => profile.id === id);

    if (profileIndex === -1) {
        return next(new ApiError('Profile not found', 404));
    }

    if (oldPassword) {
        const isPasswordCorrect = await bcrypt.compare(oldPassword, Profiles[profileIndex].password);
        
        if (!isPasswordCorrect) {
            return next(new ApiError('Invalid old password', 400));
        }
        if (newPassword) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            Profiles[profileIndex].password = hashedNewPassword;
        }
    }

    Profiles[profileIndex].first_name = first_name || Profiles[profileIndex].first_name;
    Profiles[profileIndex].last_name = last_name || Profiles[profileIndex].last_name;
    Profiles[profileIndex].email = email || Profiles[profileIndex].email;

    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));

    res.json({ message: 'Profile updated successfully', data: Profiles[profileIndex] });
});

//delete profile
exports.deleteProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const profileIndex = Profiles.findIndex(profile => profile.id === id);

    if (profileIndex === -1) {
        return next(new ApiError('Profile not found', 404));
    }
    await Profiles.splice(profileIndex, 1);
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Profile deleted successfully' });
});


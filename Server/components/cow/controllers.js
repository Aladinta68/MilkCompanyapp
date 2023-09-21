const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');

const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Cows } = databaseContent;

if (!Cows) {
    Cows = [];
}

const cowsPerPage = 8;

function generateId() {
    let numericId;
    if (Cows.length === 0) {
        numericId = 1
    } else {
        numericId = (parseInt(Cows[Cows.length - 1].id) + 1).toString();
    }
    return numericId;
}

// Get all Cows
exports.getallCows = asyncHandler(async (req, res) => {
    res.status(200).json({
        results: Cows.length,
        data: Cows
    });
});

// Get all Cows by page
exports.getCows = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || cowsPerPage;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const slicedCows = Cows.slice(startIndex, endIndex);

    res.status(200).json({
        results: slicedCows.length,
        currentPage: page,
        totalPages: Math.ceil(Cows.length / limit),
        data: slicedCows
    });
});

// Get cow birth
exports.getCowsbirth = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || cowsPerPage;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const cowsWithMother = Cows.filter((cow) => cow.motherid);
    const slicedCowsbirth = cowsWithMother.slice(startIndex, endIndex);

    res.status(200).json({
        results: cowsWithMother.length,
        currentPage: page,
        totalPages: Math.ceil(cowsWithMother.length / limit),
        data: slicedCowsbirth,
    });
});

// Add Cow
exports.addCow = asyncHandler(async (req, res) => {
    const { dateofentry, breed } = req.body;
    if (!dateofentry) {
        return res.status(400).json({ message: ' date of entry are required .' });
    }
    const validBreeds = ['Holstein', 'Montbéliarde'];
    if (!validBreeds.includes(breed)) {
        return res.status(400).json({ message: 'Invalid Breed .' });
    }
    const numericId = generateId(); 
    const newCow = {
        id: numericId,
        dateofentry,
        breed
    };
    await Cows.push(newCow);
    databaseContent.Cows = Cows;
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));

    res.status(201).json({ message: 'Cow added successfully', data: newCow });
});

// Add Cow Birth
exports.addCowbirth = asyncHandler(async (req, res) => {
    const { motherid, dateofbirth, breed } = req.body;
    if (!dateofbirth) {
        return res.status(400).json({ message: 'date of birth are required.' });
    }
    const cowExists = Cows.some(cow => cow.id === motherid);
    if (!cowExists) {
        return res.status(400).json({ message: 'Invalid motherid' });
    }
    const validBreeds = ['Holstein', 'Montbéliarde'];
    if (!validBreeds.includes(breed)) {
        return res.status(400).json({ message: 'Invalid Breed ' });
    }
    const numericId = generateId(); 
    const newCowbirth = {
        id: numericId,
        motherid,
        dateofentry: dateofbirth,
        breed
    };

    await Cows.push(newCowbirth);
    databaseContent.Cows = Cows;
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.status(201).json({ message: 'Cow birth added successfully', data: newCowbirth });
});

// Update Cow
exports.updateCow = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { dateofentry, breed } = req.body;
    const CowIndex = Cows.findIndex(Cow => Cow.id === id);
    if (CowIndex === -1) {
        return next(new ApiError('Cow not found', 404));
    }
    const validBreeds = ['Holstein', 'Montbéliarde'];
    if (breed) {
        if (!validBreeds.includes(breed)) {
            return res.status(400).json({ message: 'Invalid Breed .' });
        }
    }
    Cows[CowIndex].dateofentry = dateofentry || Cows[CowIndex].dateofentry;
    Cows[CowIndex].breed = breed || Cows[CowIndex].breed;

    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Cow updated successfully', data: Cows[CowIndex] });
});

// Delete Cow
exports.deleteCow = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const CowIndex = Cows.findIndex(Cow => Cow.id === id);

    if (CowIndex === -1) {
        return next(new ApiError('Cow not found', 404));
    }
    await Cows.splice(CowIndex, 1);
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Cow deleted successfully' });
});

const fs = require('fs')
const path = require('path');

const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');

const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Milks } = databaseContent;

if (!Milks) {
    Milks = [];
}
const MilksPerPage = 8;

function generateId() {
    let numericId;
    if (Milks.length === 0) {
        numericId = 1
    } else {
        numericId = (parseInt(Milks[Milks.length - 1].id) + 1).toString();
    }
    return numericId;
}

//get all milks
exports.getMilks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || MilksPerPage;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const slicedMilks = Milks.slice(startIndex, endIndex);

    res.status(200).json({
        results: slicedMilks.length,
        currentPage: page,
        totalPages: Math.ceil(Milks.length / limit),
        data: slicedMilks
    });
});
//add milk
exports.addMilk = asyncHandler(async (req, res, next) => {
    const { date, quantity } = req.body;
    if (!date || !quantity) {
        return next(new ApiError('Date and quantity are required fields', 400));
    }
    const numericId = generateId(); 
    const newMilk = {
        id: numericId,
        date,
        quantity
    };
    await Milks.push(newMilk);
    databaseContent.Milks = Milks;
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.status(201).json({ message: 'Milk added successfully', data: newMilk });
});
//update milk
exports.updateMilk = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { date, quantity } = req.body;
    const MilkIndex = Milks.findIndex(Milk => Milk.id === id);
    if (MilkIndex === -1) {
        return next(new ApiError('Milk not found', 404));
    }
    Milks[MilkIndex].date = date || Milks[MilkIndex].date;
    Milks[MilkIndex].quantity = quantity || Milks[MilkIndex].quantity;

    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Milk updated successfully', data: Milks[MilkIndex] });
});
//delete milk
exports.deleteMilk = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const MilkIndex = Milks.findIndex(Milk => Milk.id === id);

    if (MilkIndex === -1) {
        return next(new ApiError('Milk not found', 404));
    }
    await Milks.splice(MilkIndex, 1);
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Milk deleted successfully' });
});
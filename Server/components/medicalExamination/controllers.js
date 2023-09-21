const fs = require('fs')
const path = require('path');

const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');


const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Medicalexaminations } = databaseContent;
let { Cows } = databaseContent;

if (!Medicalexaminations) {
    Medicalexaminations = [];
}
const MedicalexaminationsPerPage = 8;

function generateId() {
    let numericId;
    if (Medicalexaminations.length === 0) {
        numericId = 1
    } else {
        numericId = (parseInt(Medicalexaminations[Medicalexaminations.length - 1].id) + 1).toString();
    }
    return numericId;
}

//get all Medical examinations
exports.getMedicalexaminations = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || MedicalexaminationsPerPage;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const slicedMedicalexaminations = Medicalexaminations.slice(startIndex, endIndex);
    res.status(200).json({
        results: slicedMedicalexaminations.length,
        currentPage: page,
        totalPages: Math.ceil(Medicalexaminations.length / limit),
        data: slicedMedicalexaminations
    });
});
//add medical examination
exports.addMedicalexamination = asyncHandler(async (req, res, next) => {
    const { cowid, dateofexamination, disease } = req.body;
    const allowedDiseases = [
        "Bluetongue",
        "Botulism",
        "Bovine-Tuberculosis",
        "Brucellosis"
    ];
    const cowIds = Cows.map(cow => cow.id);
    if (!dateofexamination) {
        return next(new ApiError('Date of examination is required.', 400));
    }

    if (!allowedDiseases.includes(disease)) {
        return next(new ApiError('Invalid disease. Please provide a valid disease.', 400));
    }
    if (!cowIds.includes(cowid)) {
        return next(new ApiError('Invalid cow ID. Please provide a valid cow ID.', 400));
    }
    const numericId = generateId(); 
    const newMedicalexamination = {
        id: numericId,
        cowid,
        dateofexamination,
        disease
    };
    await Medicalexaminations.push(newMedicalexamination);
    databaseContent.Medicalexaminations = Medicalexaminations;
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.status(201).json({ message: 'Medical examination added successfully', data: newMedicalexamination });
});

//update Medical examination
exports.updateMedicalexamination = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { dateofexamination, disease, cowid } = req.body;
    const MedicalexaminationIndex = Medicalexaminations.findIndex(Medicalexamination => Medicalexamination.id === id);

    if (MedicalexaminationIndex === -1) {
        return next(new ApiError('Medical examination not found', 404));
    }
    const allowedDiseases = [
        "Bluetongue",
        "Botulism",
        "Bovine-Tuberculosis",
        "Brucellosis"
    ];
    if (disease && !allowedDiseases.includes(disease)) {
        return next(new ApiError('Invalid disease. Please provide a valid disease.', 400));
    }

    const cowIds = Cows.map(cow => cow.id);
    if (cowid && !cowIds.includes(cowid)) {
        return next(new ApiError('Invalid cow ID. Please provide a valid cow ID.', 400));
    }
    Medicalexaminations[MedicalexaminationIndex].dateofexamination = dateofexamination || Medicalexaminations[MedicalexaminationIndex].disease;
    Medicalexaminations[MedicalexaminationIndex].disease = disease || Medicalexaminations[MedicalexaminationIndex].disease;
    Medicalexaminations[MedicalexaminationIndex].cowid = cowid || Medicalexaminations[MedicalexaminationIndex].cowid;

    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Medical examination updated successfully', data: Medicalexaminations[MedicalexaminationIndex] });
});

//delete Cow
exports.deleteMedicalexamination = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const MedicalexaminationIndex = Medicalexaminations.findIndex(Medicalexamination => Medicalexamination.id === id);

    if (MedicalexaminationIndex === -1) {
        return next(new ApiError('Medical examination not found', 404));
    }
    await Medicalexaminations.splice(MedicalexaminationIndex, 1);
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Medical examination deleted successfully' });
});
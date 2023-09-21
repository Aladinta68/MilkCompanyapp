
const router = require('express').Router()

const { getMedicalexaminations, addMedicalexamination, updateMedicalexamination, deleteMedicalexamination } = require('./controllers')


router.route('/').get(getMedicalexaminations).post(addMedicalexamination)
router.route('/:id').put(updateMedicalexamination).delete(deleteMedicalexamination)


module.exports = router
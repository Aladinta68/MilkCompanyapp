
const router = require('express').Router()

const { addMilk,getMilks,updateMilk,deleteMilk } = require('./controllers')


router.route('/').get(getMilks).post(addMilk)
router.route('/:id').put(updateMilk).delete(deleteMilk)


module.exports = router
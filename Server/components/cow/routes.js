
const router = require('express').Router()

const { getCows,addCow,updateCow,deleteCow,addCowbirth, getCowsbirth,getallCows } = require('./controllers')


router.route('/').get(getCows).post(addCow)
router.route('/:id').put(updateCow).delete(deleteCow)
router.route('/cowbirth').get(getCowsbirth).post(addCowbirth)
router.route('/all').get(getallCows)



module.exports = router
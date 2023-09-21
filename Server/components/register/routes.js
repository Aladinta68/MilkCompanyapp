const router = require('express').Router()

const {  addProfile } = require('./controllers')

router.route('/').post(addProfile);



module.exports = router
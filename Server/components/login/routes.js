const router = require('express').Router()

const {  login } = require('./controllers')

router.route('/').post(login);



module.exports = router
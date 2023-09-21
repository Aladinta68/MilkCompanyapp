const router = require('express').Router()
const cowRoutes = require('./components/cow/routes')
const medicalexaminationRoutes = require('./components/medicalExamination/routes')
const milkRoutes = require('./components/milk/routes')
const profileRoutes = require('./components/profile/routes')
const loginroutes = require('./components/login/routes')
const registerroutes = require('./components/register/routes')
const {auth} =require('./middlewares/auth')

router.use('/cow',auth,cowRoutes);
router.use('/medicalexamination',auth,medicalexaminationRoutes);
router.use('/milk',auth,milkRoutes);
router.use('/profile',auth,profileRoutes);
router.use('/login',loginroutes);
router.use('/register',auth,registerroutes);


module.exports = router
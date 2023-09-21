
const router = require('express').Router()

const { getProfiles, getoneProfile, updateProfile, deleteProfile } = require('./controllers')


router.route('/').get(getProfiles)
router.route('/:id').get(getoneProfile).put(updateProfile).delete(deleteProfile)



module.exports = router
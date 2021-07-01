const router = require('express').Router()

router.use('/api', require('./dogRoutes.js'))
router.use('/api', require('./ownerRoutes.js'))

module.exports = router

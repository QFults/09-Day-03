const router = require('express').Router()

router.use('/api', require('./dogRoutes.js'))

module.exports = router

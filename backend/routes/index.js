const router = require('express').Router()
const userRoute = require('./userRoute')
const gameRoute = require('./gameRoute')

router.use('/user', userRoute)
router.use('/game', gameRoute)

module.exports = router

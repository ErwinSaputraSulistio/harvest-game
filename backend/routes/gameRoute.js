const router = require('express').Router()
const GameController = require('../modules/controllers/gameController')
const { authenticate } = require('../modules/middlewares/authenticate')

router.get('/',) // begin play > get inventories & garden
router.post("/plant", GameController.plant)
router.post('/bonus/starter', authenticate, GameController.getEarlySeeds) // user plant plants into garden


module.exports = router 
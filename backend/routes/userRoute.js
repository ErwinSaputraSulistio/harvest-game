const router = require('express').Router()
const UserController = require('../modules/controllers/userController')
const {authenticate} = require('../modules/middlewares/authenticate')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authenticate)
router.post('/changepassword', UserController.changePassword)

module.exports = router 
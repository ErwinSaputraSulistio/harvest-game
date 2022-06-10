 const jwt = require('jsonwebtoken')
 const model = require('../models/userModel')

 const authenticate = async (req, res, next) => {
   try {
     if(!req.headers.access_token) {
       throw { name: 'EmptyToken' }
     }
     const token = req.headers.access_token
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     const user = await model.findUser(decoded.email)
     if(!user) { throw { name: 'InvalidToken' } }
     req.decoded = decoded
     next()
   } catch (err) {
     next(err)
   }
 }

 module.exports = {authenticate}
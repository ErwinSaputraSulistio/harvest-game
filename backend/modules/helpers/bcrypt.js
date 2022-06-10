const bcrypt = require('bcryptjs')

function hashPass(pass){
  return bcrypt.hashSync(pass, 8)
}

function checkPass(pass, hashedPass) {
  return bcrypt.compareSync(pass, hashedPass)
}

module.exports = { hashPass, checkPass }
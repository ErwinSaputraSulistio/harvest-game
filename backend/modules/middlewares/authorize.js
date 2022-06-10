const User = require("../models/userModel");

function authorizationAdmin(req, res, next) {
  let userEmail = +req.loggedUser.email;
  let role = req.loggedUser.role;
  User.findUser(userEmail)
    .then((data) => {
      if (data) {
        if (role === "admin") {
          next();
        } else {
          next({ name: "Unauthorized" });
        }
      } else {
        next({ name: "not found" });
      }
    })
    .catch((err) => {
      next({ message: err.message });
    });
}

function authorization(req, res, next) {
  let userId = +req.loggedUser.id;
  User.getGarden(userId)
    .then((data) => {
      if (data) {
        if (data.UserId === userId) {
          next();
        } else {
          next({ name: "Unauthorized" });
        }
      } else {
        next({ name: "Not Found" });
      }
    })
    .catch((err) => {
      next({ message: err.message });
    });
}

module.exports = {
  authorizationAdmin,
  authorization,
};

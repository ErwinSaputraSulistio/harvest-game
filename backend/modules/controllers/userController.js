const model = require("../models/userModel");
const { hashPass, checkPass } = require("../helpers/bcrypt");
const { generateToken, verifyToken } = require("../helpers/jwt");
var ObjectId = require("mongodb").ObjectId;

class UserController {
  static register = async (req, res, next) => {
    const { email, username, password } = req.body;
    try {
      const reg = await model.register({
        email,
        username,
        password: hashPass(password),
      });
      if (reg) {
        res.status(201).json(reg);
      }
    } catch (err) {
      next(err);
    }
  };

  static login = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const userLoginInfo = await model.login(email);
      if (userLoginInfo) {
        const comparePassword = checkPass(password, userLoginInfo.password);
        if (comparePassword) {
          const id = userLoginInfo._id.toString();
          const access_token = generateToken({
            id,
            email: userLoginInfo.email,
            username: userLoginInfo.username,
          });
          console.log(access_token);
          res.status(200).json({
            status:200,
            msg: "Login Successful",
            data: {
              username: userLoginInfo.username,
              email: userLoginInfo.email,
              token: access_token,
            },
          });
        } else {
          throw { name: "InvalidUserPass" };
        }
      }
    } catch (err) {
      next(err);
    }
  };

  static changePassword = async (req, res, next) => {
    try {
      console.log(req.decoded);
      const { oldPassword, newPassword } = req.body;
      console.log(oldPassword, newPassword);

      const email = req.decoded.email;
      const userId = req.decoded.id;

      const user = await model.findUser(email);
      console.log(user);
      const isPasswordMatch = checkPass(oldPassword, user.password);
      console.log({ _id: ObjectId(movieId.id) });
      if (isPasswordMatch) {
        const hashedNewPass = hashPass(newPassword);

        const updatedUser = await model.updateUser(
          { _id: ObjectId(userId) },
          {
            password: hashedNewPass,
          }
        );
        console.log(updatedUser);
        res.status(200).json({ msg: "change password success" });
      } else {
        throw { name: "InvalidUserPass" };
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;

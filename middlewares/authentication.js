const LoginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  try {
    const loginData = jwt.verify(token, "encrypt");

    LoginModel.findById(loginData._id).then(() => {
      next();
    });
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = authenticate;

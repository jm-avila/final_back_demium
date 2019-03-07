// /idea (POST, PUT, GET, DELETE)
const express = require("express");
const LoginModel = require("../models/loginModel");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");

loginRouter.route("/").post((req, res, next) => {
  LoginModel.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then(account => {
      const token = jwt.sign({ email: account.email }, "encrypt").toString();
      res.status(200).send({ accessToken: token });
      console.log(token);
    })
    .catch(error => {
      res.status(401).send({
        name: "NotAuthenticated",
        message: "Invalid login",
        code: 401
      });
    });
});

module.exports = loginRouter;

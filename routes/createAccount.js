// /idea (POST, PUT, GET, DELETE)
const express = require("express");
const LoginModel = require("../models/loginModel");
const createAccountRouter = express.Router();

createAccountRouter.route("/").post((req, res, next) => {
  new LoginModel({ email: req.body.email, password: req.body.password })
    .save()
    .then(newAccount => {
      res.status(200).send({ _id: newAccount._id });
    })
    .catch(() => {
      res.status(401).send({
        code: 401,
        error: "Account not created"
      });
    });
});

module.exports = createAccountRouter;

// /role (GET)
const express = require("express");
const RoleModel = require("../models/roleModel");
const authenticate = require("../middlewares/authentication");
const roleRouter = express.Router();

roleRouter
  .route("/")
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    RoleModel.find({})
      .then(roles => res.status(200).send({ data: roles }))
      .catch(err => console.log(err));
  });

module.exports = roleRouter;

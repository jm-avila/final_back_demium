// /businessmodel (GET)
const express = require("express");
const BModelModel = require("../models/businessmodelModel");
const authenticate = require("../middlewares/authentication");
const businessmodelRouter = express.Router();

businessmodelRouter
  .route("/")
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    BModelModel.find({})
      .then(bModel => res.status(200).send({ data: bModel }))
      .catch(err => console.log("bModel - GET error => ", err));
  });

module.exports = businessmodelRouter;

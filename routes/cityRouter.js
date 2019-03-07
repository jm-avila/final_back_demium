// /city (POST, PUT, GET, DELETE)
const express = require("express");
const CityModel = require("../models/cityModel");
const authenticate = require("../middlewares/authentication");
const cityRouter = express.Router();
const mongoose = require("mongoose");

cityRouter
  .route("/")
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    CityModel.find({})
      .then(city => res.status(200).send({ data: city }))
      .catch(err => console.log(err));
  })
  .post((req, res, next) => {
    new CityModel(req.body)
      .save()
      .then(newCity => {
        res.status(200).send(newCity);
      })
      .catch(err => console.log(err));
  });

cityRouter
  .route("/:cityId")
  .all(authenticate, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cityId))
      res
        .status(400)
        .end("Invalid ID")
        .catch(err => console.log(err));

    if (!req.body)
      res
        .status(400)
        .end("Data is mandatory to update.")
        .catch(err => console.log(err));
    next();
  })
  .get((req, res, next) => {
    CityModel.findById(req.params.cityId)
      .then(city => res.status(200).send(city))
      .catch(err => console.log(err));
  })
  .put((req, res, next) => {
    CityModel.findByIdAndUpdate(
      req.params.cityId,
      { ...req.body },
      { new: true, overwrite: true, runValidator: true }
    )
      .then(city => res.status(200).send(city))
      .catch(err => console.log(err));
  })
  .delete((req, res, next) => {
    CityModel.findByIdAndDelete(req.params.cityId)
      .then(city => res.status(200).send(city))
      .catch(err => console.log(err));
  });

module.exports = cityRouter;

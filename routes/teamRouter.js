// /team (POST, PUT, GET, DELETE)
const express = require("express");
const TeamModel = require("../models/teamModel");
const authenticate = require("../middlewares/authentication");
const teamRouter = express.Router();
const mongoose = require("mongoose");

teamRouter
  .route("/")
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    TeamModel.find({})
      .then(team => res.status(200).send({ data: team }))
      .catch(err => console.log(err));
  })
  .post((req, res, next) => {
    new TeamModel(req.body)
      .save()
      .then(newTeam => {
        res.status(200).send(newTeam);
      })
      .catch(err => console.log(err));
  });

teamRouter
  .route("/:teamId")
  .all(authenticate, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.teamId))
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
    TeamModel.findById(req.params.teamId)
      .then(team => res.status(200).send(team))
      .catch(err => console.log(err));
  })
  .put((req, res, next) => {
    TeamModel.findByIdAndUpdate(
      req.params.teamId,
      { ...req.body },
      { new: true, overwrite: true, runValidator: true }
    )
      .then(team => res.status(200).send(team))
      .catch(err => console.log(err));
  })
  .delete((req, res, next) => {
    TeamModel.findByIdAndDelete(req.params.teamId)
      .then(team => res.status(200).send(team))
      .catch(err => console.log(err));
  });

module.exports = teamRouter;

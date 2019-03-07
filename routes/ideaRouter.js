// /idea (POST, PUT, GET, DELETE)
const express = require("express");
const IdeaModel = require("../models/ideaModel");
const authenticate = require("../middlewares/authentication");
const ideaRouter = express.Router();
const mongoose = require("mongoose");

ideaRouter
  .route("/")
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    IdeaModel.find({})
      .then(city => res.status(200).send({ data: city }))
      .catch(err => console.log(err));
  })
  .post((req, res, next) => {
    new IdeaModel(req.body)
      .save()
      .then(newIdea => {
        res.status(200).send(newIdea);
      })
      .catch(err => console.log(err));
  });

ideaRouter
  .route("/:ideaId")
  .all(authenticate, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.ideaId))
      return res.status(400).send("Invalid ID");

    if (!req.body) return res.status(400).send("Data is mandatory to update.");
    next();
  })
  .get((req, res, next) => {
    IdeaModel.findById(req.params.ideaId)
      .then(idea => res.status(200).send(idea))
      .catch(err => console.log(err));
  })
  .put((req, res, next) => {
    IdeaModel.findByIdAndUpdate(
      req.params.ideaId,
      { ...req.body },
      { new: true, overwrite: true, runValidator: true }
    )
      .then(idea => res.status(200).send(idea))
      .catch(err => console.log(err));
  })

  .delete((req, res, next) => {
    IdeaModel.findByIdAndDelete(req.params.ideaId)
      .then(idea => res.status(200).send(idea))
      .catch(err => console.log(err));
  });

module.exports = ideaRouter;

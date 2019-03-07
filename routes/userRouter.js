// /user (POST, PUT, GET, DELETE)
const express = require("express");
const UserModel = require("../models/userModel");
const authenticate = require("../middlewares/authentication");
const userRouter = express.Router();
const mongoose = require("mongoose");

userRouter
  .route("/")
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    UserModel.find({})
      .then(user => res.status(200).send({ data: user }))
      .catch(err => console.log(err));
  })
  .post((req, res, next) => {
    new UserModel(req.body)
      .save()
      .then(newUser => {
        res.status(200).send(newUser);
      })
      .catch(err => console.log(err));
  });

userRouter
  .route("/:userId")
  .all(authenticate, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId))
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
    UserModel.findById(req.params.userId)
      .then(user => res.status(200).send(user))
      .catch(err => console.log(err));
  })
  .put((req, res, next) => {
    UserModel.findByIdAndUpdate(
      req.params.userId,
      { ...req.body },
      { new: true, overwrite: true, runValidator: true }
    )
      .then(user => res.status(200).send(user))
      .catch(err => console.log(err));
  })
  .delete((req, res, next) => {
    UserModel.findByIdAndDelete(req.params.userId)
      .then(user => res.status(200).send(user))
      .catch(err => console.log(err));
  });

module.exports = userRouter;

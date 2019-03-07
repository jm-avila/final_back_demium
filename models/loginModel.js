const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const LoginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: email => validator.isEmail(email),
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20
  }
});

const LoginModel = mongoose.model("login", LoginSchema);

module.exports = LoginModel;

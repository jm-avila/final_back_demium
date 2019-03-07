const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true,
      validate: {
        isAsync: true,
        validator: name => Boolean(name.match(/^[A-Z a-z]+[ ]?[A-Z a-z]+$/)),
        message:
          "{VALUE} is not a valid idea name, only characters (A-Z, a-z, and space)"
      }
    },
    surname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true,
      validate: {
        isAsync: true,
        validator: name => Boolean(name.match(/^[A-Z a-z]+[ ]?[A-Z a-z]+$/)),
        message:
          "{VALUE} is not a valid idea name, only characters (A-Z, a-z, and space)"
      }
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 254,
      trim: true,
      unique: true,
      validate: {
        isAsync: true,
        validator: email => validator.isEmail(email),
        message: "{VALUE} is not a valid email"
      }
    },
    telephone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 9,
      trim: true,
      unique: true,
      validate: {
        isAsync: true,
        validator: name => Boolean(name.match(/^[0-9]*$/)),
        message: "{VALUE} is not a valid telephone name, only numbers allowed"
      }
    },
    roleId: mongoose.Types.ObjectId
  },
  { strict: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

const mongoose = require("mongoose");

const CityUserSchema = mongoose.Schema(
  {
    id: mongoose.Types.ObjectId
  },
  { _id: false }
);
const CitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 26,
      trim: true,
      validate: {
        isAsync: true,
        validator: name => Boolean(name.match(/^[A-Z a-z]+[ ]?[A-Z a-z]+$/)),
        message:
          "{VALUE} is not a valid City name, only characters (A-Z, a-z, and space)"
      }
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 26,
      trim: true
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
    users: [CityUserSchema]
  },
  { strict: true }
);

const CityModel = mongoose.model("city", CitySchema);

module.exports = CityModel;

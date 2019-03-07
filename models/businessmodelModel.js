const mongoose = require("mongoose");
const BModelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
      trim: true,
      unique: true,
      validate: {
        isAsync: true,
        validator: name => Boolean(name.match(/^[A-Z-a-z]+[ ]?[A-Z-a-z]+$/)),
        message:
          "{VALUE} is not a valid business model, only characters (A-Z, a-z, -)"
      }
    }
  },
  { strict: true }
);

const BModelModel = mongoose.model("bModel", BModelSchema);

module.exports = BModelModel;

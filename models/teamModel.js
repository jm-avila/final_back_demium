const mongoose = require("mongoose");

const TeamUserSchema = mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId
  },
  { _id: false }
);
const TeamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      unique: true,
      trim: true,
      validate: {
        isAsync: true,
        validator: name => Boolean(name.match(/^[A-Z a-z]+[ ]?[A-Z a-z]+$/)),
        message:
          "{VALUE} is not a valid idea name, only characters (A-Z, a-z, and space)"
      }
    },
    cityId: mongoose.Types.ObjectId,
    users: [TeamUserSchema]
  },
  { strict: true }
);

const TeamModel = mongoose.model("team", TeamSchema);

module.exports = TeamModel;

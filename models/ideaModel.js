const mongoose = require("mongoose");
const IdeaSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
      validate: {
        isAsync: true,
        validator: description =>
          Boolean(description.match(/^[A-Z a-z]+[ ]?[A-Z a-z]+$/)),
        message:
          "{VALUE} is not a valid description, only characters (A-Z, a-z, and space)"
      }
    },
    businessModelId: mongoose.Types.ObjectId,
    teamId: { type: mongoose.Types.ObjectId, required: false }
  },
  { strict: true }
);

const IdeaModel = mongoose.model("idea", IdeaSchema);

module.exports = IdeaModel;

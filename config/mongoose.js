const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://jmavila:secreto123@demiumdb-5xh2a.mongodb.net/demiumApp?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

module.exports = mongoose;

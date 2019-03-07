const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
require("./config/mongoose");
const cors = require("cors");

const loginRouter = require("./routes/loginRouter");
const createAccount = require("./routes/createAccount");
const bModelRouter = require("./routes/businessmodelRouter");
const cityRouter = require("./routes/cityRouter");
const ideaRouter = require("./routes/ideaRouter");
const roleRouter = require("./routes/roleRouter");
const teamRouter = require("./routes/teamRouter");
const userRouter = require("./routes/userRouter");

const port = process.env.PORT;
// const port = 8585;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("<h1>Hello</h1>");
});
app.use("/auth-users", createAccount);
app.use("/authentication", loginRouter);
app.use("/businessmodel", bModelRouter);
app.use("/city", cityRouter);
app.use("/idea", ideaRouter);
app.use("/role", roleRouter);
app.use("/team", teamRouter);
app.use("/user", userRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

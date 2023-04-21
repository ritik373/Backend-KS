const express = require("express");
const bodyParser = require("body-parser");
const loginRouter = require("./Routes/Login");
const chatRouter = require("./Routes/chat");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(loginRouter);
app.use(chatRouter);

app.use("/", (req, res) => {
  res.send("<h1>Go To /login</h1>");
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const cors = require("cors");
const app = express();

const UserRouter = require("./Routes/user");

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", UserRouter);

sequelize
  .sync({ force: true })
  .then((res) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utils/database");
const userRoutes = require("./Routes/userRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("err", err);
  });

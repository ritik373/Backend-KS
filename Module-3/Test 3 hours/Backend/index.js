const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Utils/database");
const productRouter = require("../Backend/Routes/IndexRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", productRouter);

sequelize
  .sync()
  .then((res) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("error");
  });

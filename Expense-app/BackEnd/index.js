const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userExpensesRouter = require("./Routes/userExpenseRouter");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", userExpensesRouter);

sequelize
  .sync()
  .then((res) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

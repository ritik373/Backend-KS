const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utils/database");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/MessageRoutes");
const User = require("./Models/userModel");
const Message = require("./Models/userModel");
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", userRoutes);
app.use("/message", messageRoutes);

Message.belongsTo(User);
User.hasMany(Message);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("err", err);
  });

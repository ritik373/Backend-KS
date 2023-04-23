const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utils/database");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/MessageRoutes");
const User = require("./Models/userModel");
const Message = require("./Models/MeassageModel");
const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("err", err);
  });

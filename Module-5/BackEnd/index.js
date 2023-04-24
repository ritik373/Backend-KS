const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utils/database");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/MessageRoutes");
const groupRoutes = require("./Routes/GroupRoutes");
const User = require("./Models/userModel");
const Message = require("./Models/MeassageModel");
const Group = require("./Models/GroupModel");
const UserGroup = require("./Models/UserGroupModel");
const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/group", groupRoutes);

User.hasMany(Message);
Message.belongsTo(User);

Message.belongsTo(Group);
Group.hasMany(Message);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("err", err);
  });

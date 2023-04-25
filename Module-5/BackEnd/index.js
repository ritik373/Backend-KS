const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utils/database");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/MessageRoutes");
const groupRoutes = require("./Routes/GroupRoutes");
const GroupParticipants = require("./Routes/GroupParti");
const User = require("./Models/userModel");
const Message = require("./Models/MeassageModel");
const Group = require("./Models/GroupModel");
const GroupParti = require("./Models/GroupParti");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/group", groupRoutes);
app.use("/groups", GroupParticipants);

User.hasMany(Message);
Message.belongsTo(User);

Message.belongsTo(Group);
Group.hasMany(Message);

GroupParti.belongsTo(User);
GroupParti.belongsTo(Group);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("err", err);
  });

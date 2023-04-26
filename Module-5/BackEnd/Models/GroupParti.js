const sequelize = require("sequelize");

const Sequelize = require("../Utils/database");

const GroupParticipants = Sequelize.define("GroupsMember", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = GroupParticipants;

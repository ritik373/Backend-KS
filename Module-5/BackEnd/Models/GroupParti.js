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
    unique: true,
  },
});

module.exports = GroupParticipants;

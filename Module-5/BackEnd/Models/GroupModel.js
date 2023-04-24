const Sequelize = require("sequelize");

const sequelize = require("../Utils/database");

const Group = sequelize.define("groups", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adminname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Group;

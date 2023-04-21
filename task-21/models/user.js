const sequelize = require("sequelize");

const Sequelize = require("../util/database");

const User = Sequelize.define("user", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: sequelize.STRING,
  email: sequelize.STRING,
});

module.exports = User;

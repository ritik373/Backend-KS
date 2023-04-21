const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense", "root", "dk35403540", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

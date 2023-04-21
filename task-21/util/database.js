const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "dk35403540", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

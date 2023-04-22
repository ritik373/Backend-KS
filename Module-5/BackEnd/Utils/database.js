const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("chat-app", "root", "dk35403540", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

const Sequelize = require("sequelize").Sequelize;
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.MY_SQL_DB,
  process.env.MY_SQL_DB_NAME,
  process.env.MY_SQL_DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;

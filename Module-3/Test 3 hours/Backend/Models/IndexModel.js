const sequelize = require("sequelize");

const Sequelize = require("../Utils/database");

const ProductSummary = Sequelize.define("product", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  sellingPrice: {
    type: sequelize.BIGINT,
    allowNull: false,
  },
  productName: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductSummary;

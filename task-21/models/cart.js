const sequelize = require("sequelize");

const Sequelize = require("../util/database");

const CartItem = Sequelize.define("cart", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: sequelize.INTEGER,
});

module.exports = CartItem;

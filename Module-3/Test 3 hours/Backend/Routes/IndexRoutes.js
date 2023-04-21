const express = require("express");
const {
  PostProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/IndexCOntr");
const {
  deleteExpense,
} = require("../../../../Expense-app/BackEnd/controllers/userExpenseController");

const Router = express.Router();

Router.post("/product", PostProduct);
Router.get("/product", getProduct);
Router.delete("/product/:id", deleteProduct);

module.exports = Router;

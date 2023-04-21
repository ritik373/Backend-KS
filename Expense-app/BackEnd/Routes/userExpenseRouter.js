const express = require("express");
const {
  addUserExpense,
  getUserExpense,
  deleteExpense,
} = require("../controllers/userExpenseController");
const Router = express.Router();

Router.post("/addExp", addUserExpense);
Router.get("/getExp", getUserExpense);
Router.delete("/deleteExp/:id", deleteExpense);

module.exports = Router;

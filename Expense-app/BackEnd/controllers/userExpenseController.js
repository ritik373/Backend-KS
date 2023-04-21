const UserExpense = require("../Models/UserExpensModel");

exports.addUserExpense = async (req, res, next) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const data = await UserExpense.create({ amount, description, category });
    res.send(200).json({ expenses: data });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getUserExpense = async (req, res, next) => {
  try {
    const userExpense = await UserExpense.findAll();
    res.status(200).json({ userExpense });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ err: "Define Id" });
    }
    const Id = req.params.id;
    await UserExpense.destroy({ where: { id: Id } });
    res.send(200);
    next();
  } catch (error) {
    console.log("error:", error);
  }
};



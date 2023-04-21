const User = require("../models/user");

exports.addUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const data = await User.create({ name, email, phoneNo });
    res.status(200).json({ newUser: data });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ allUsers: user });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ err: "Define Id" });
    }
    const Id = req.params.id;
    await User.destroy({ where: { id: Id } });
    res.send(200);
  } catch (error) {
    console.log("error:", error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ err: "Define Id" });
    }
    const Id = req.params.id;
    await User.build({ where: { id: Id } });
    res.send(200);
  } catch (error) {
    console.log("error:", error);
  }
};

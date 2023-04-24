const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let url = req.body.url;
    let phoneNo = req.body.phoneNo;
    console.log(name, password, email);
    let user = await User.findOne({
      where: { name: name, email: email, phoneNo: phoneNo },
    });
    if (user) {
      return res.status(400).json({ message: "User Already Exits" });
    } else {
      const saltrounds = 10;
      bcrypt.hash(password, saltrounds, async (err, hash) => {
        // console.log(err);
        await User.create({
          name: name,
          email: email,
          password: hash,
          url: url,
          phoneNo: phoneNo,
        });
      });
      res
        .status(201)
        .json({ message: "You are successfully signed up", success: true });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ err: error, success: false });
  }
};

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, process.env.SECRET_KEY);
}

exports.signin = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo } = req.body;
    const users = await User.findAll({
      where: { email: email, name: name, phoneNo: phoneNo },
    });
    const user = users[0];
    if (!user) {
      return res.status(404).json({ err: "User not found", success: false });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new Error("Something went wrong");
      }

      if (result) {
        res.status(200).json({
          message: "User logged in successfully",
          success: true,
          token: generateAccessToken(user.id),
          userName: user.name,
          userEmail: user.email,
          userId: user.id,
          url: users.url,
        });
      } else {
        res.status(404).json({ err: "Incorrect passowrd", success: false });
      }
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error, success: false });
  }
};

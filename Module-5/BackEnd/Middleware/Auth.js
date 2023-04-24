const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(userInfo.userId);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

const Message = require("../Models/MeassageModel");

exports.postMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    console.log(">>>>>>>", message);
    await Message.create({ message: message });
    res.status(201).json({ message: "message sent successfully" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

const Message = require("../Models/MeassageModel");

exports.postMessage = async (req, res, next) => {
  try {
    const { name, message } = req.body;
    let UserId = req.user.id;
    console.log(">>>>>>>", name, message, UserId);
    let mes = await Message.create({
      name: name,
      message: message,
      userId: UserId,
    });
    console.log("mes:", mes);
    res.status(201).json({ message: "message sent successfully" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const messages = await Message.findAll({ where: { userId: req.user.id } });
    console.log(">>>>>>messages>>>", messages);
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "SOMETHING WENT WRONG" });
  }
};

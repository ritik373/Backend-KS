const Message = require("../Models/MeassageModel");

exports.postMessage = async (req, res, next) => {
  try {
    const { name, message, groupId } = req.body;
    let UserId = req.user.id;
    let mes = await Message.create({
      name: name,
      message: message,
      userId: UserId,
      groupId: groupId,
    });
    res.status(201).json({ message: "message sent successfully" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.getMessage = async (req, res, next) => {
  const groupId = req.params.groupId;
  try {
    const messages = await Message.findAll({ where: { groupId: groupId } });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "SOMETHING WENT WRONG" });
  }
};

exports.deleteMessage = async (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  try {
    const group = await Message.destroy({ where: { id: id } });
    console.log(group);
    res.status(200).send({ group });
  } catch (error) {
    console.log("error:", error);
  }
};

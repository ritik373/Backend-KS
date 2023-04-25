const GroupParticipants = require("../Models/GroupParti");
const User = require("../Models/userModel");

exports.addMembers = async (req, res, next) => {
  try {
    const { email, groupId } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email Not Found" });
    }
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      return res.status(400).json({ message: "Email Not Found" });
    }
    console.log(
      "----------------------------------",
      email,
      groupId,
      userFound
    );
    const member = await GroupParticipants.create({
      email: email,
      groupId: groupId,
      userId: Number(userFound.id),
    });
    console.log(member);
    res.status(200).json({ member });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getGroups = async (req, res, next) => {
  let groupId = req.params.groupId;

  console.log("--------------------------------", groupId);
  try {
    const groupsMember = await GroupParticipants.findAll({
      where: { groupId: groupId },
    });
    console.log(groupsMember);
    res.status(200).json({ groupsMember });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ message: "Not Found" });
  }
};

exports.deleteGroup = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const group = await GroupParticipants.destroy({ where: { id: id } });
    console.log("group:", group);
  } catch (error) {
    console.log("error:", error);
  }
};

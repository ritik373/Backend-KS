const Group = require("../Models/GroupModel");
const GroupParticipants = require("../Models/GroupParti");

exports.postGroup = async (req, res, next) => {
  try {
    const { name, adminname, userId, avatar } = req.body;
    const group = await Group.create({
      name: name,
      adminname: adminname,
      avatar: avatar,
      userId: userId,
    });

    res.status(201).json(group);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ err: error, success: false });
  }
};

exports.getGroup = async (req, res, next) => {
  try {
    const groups = await Group.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ group: groups });
  } catch (err) {
    res.status(500).json({ err: err, success: "false" });
  }
};

exports.getMembersGroup = async (req, res, next) => {
  try {
    const MemGroup = await GroupParticipants.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json({ MemGroup });
  } catch (error) {
    console.log("error:", error);
  }
};

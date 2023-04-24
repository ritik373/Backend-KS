const Group = require("../Models/GroupModel");

exports.postGroup = async (req, res, next) => {
  try {
    const { name, adminname } = req.body;
    console.log(name, adminname);
    const group = await Group.create({
      name: name,
      adminname: adminname,
    });
    await req.user.addGroup(group);
    res.status(201).json(group);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ err: error, success: false });
  }
};

exports.getGroup = async (req, res, next) => {
  try {
    const groups = await Group.findAll(
      findAll({ where: { user: req.user.email } })
    );
    console.log(groups);
    res.status(200).json({ group: groups });
  } catch (err) {
    res.status(500).json({ err: err, success: "false Ni Jara" });
  }
};

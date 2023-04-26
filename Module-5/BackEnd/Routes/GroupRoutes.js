const express = require("express");

const router = express.Router();
const authController = require("../Middleware/Auth");
const groupController = require("../Controllers/GroupCon");

router.post(
  "/create-group",
  authController.authenticate,
  groupController.postGroup
);
router.get(
  "/get-groups",
  authController.authenticate,
  groupController.getGroup
);

router.get(
  "/get-Membergroups",
  authController.authenticate,
  groupController.getMembersGroup
);

module.exports = router;

const express = require("express");
const { authenticate } = require("../Middleware/Auth");
const {
  addMembers,
  getGroups,
  deleteGroup,
} = require("../Controllers/GroupParti");
const router = express.Router();

router.post("/addMember", authenticate, addMembers);
router.get("/getMember/:groupId", authenticate, getGroups);
router.delete("/delete/:id", authenticate, deleteGroup);

module.exports = router;

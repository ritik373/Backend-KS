const express = require("express");
const authController = require("../Middleware/Auth");
const messageController = require("../Controllers/MessageCon");

const router = express.Router();

router.post(
  "/send-message",
  authController.authenticate,
  messageController.postMessage
);

router.get(
  "/get-messages/:groupId",
  authController.authenticate,
  messageController.getMessage
);

module.exports = router;

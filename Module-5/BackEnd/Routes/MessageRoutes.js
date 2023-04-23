const express = require("express");

const router = express.Router();
const authController = require("../Middleware/Auth");
const messageController = require("../Controllers/MessageCon");

router.post(
  "/send-message",
  authController.authenticate,
  messageController.postMessage
);

module.exports = router;

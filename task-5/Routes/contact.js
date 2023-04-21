const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/contact", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "Contact.html"));
});

module.exports = router;

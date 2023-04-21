const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/chat", (req, res, next) => {
  fs.readFile("username.text", (err, data) => {
    if (err) {
      data = "No chat";
    }
    res.send(
      `${data}<form action='/chat' onsubmit='(document.getElementById("user").value=localStorage.getItem("username"))' method='POST'>
    <input id='msg' name='message' type='text' placeholder='message'/>
    <input type="hidden" id='user' name='username'>
    <button type='submit'>Send</button></form>`
    );
  });
});

router.post("/chat", (req, res) => {
  let msg = req.body.message;
  let username = req.body.username;

  fs.writeFileSync(
    "username.text",
    `${msg}:${username}`,
    { flag: "a" },
    (err) => {
      console.log(err);
    }
  );
});

module.exports = router;

const express = require("express");
const route = express.Router();

route.get("/login", (req, res) => {
  res.send(
    "<form onsubmit='localStorage.setItem(`username`, document.getElementById(`username`).value)' action='/chat' 'method'='POST'><input id='username' type='text' name='title'><button type='submit'>Login</button></form>"
  );
});

route.use("/login", (req, res) => {
  let usernae = req.body;
  res.redirect("/chat");
});

module.exports = route;

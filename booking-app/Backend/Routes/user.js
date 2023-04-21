const express = require("express");
const Router = express.Router();
const UserController = require("../controller/user");

Router.post("/addUser", UserController.addUser);

Router.get("/getUser", UserController.getUser);

Router.delete("/deleteUser/:id", UserController.deleteUser);

Router.get("/editUser/:id", UserController.editUser);

module.exports = Router;

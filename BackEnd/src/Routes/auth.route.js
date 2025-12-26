const express = require("express");
const Router = express.Router();
const { signUp, logIn, logOut } = require("../Controller/auth.controller.js")
const authRouter = Router.post("/signup", signUp).post("/logout", logOut).post("/login", logIn)

module.exports = authRouter;
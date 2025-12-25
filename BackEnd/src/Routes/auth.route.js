const express = require("express");
const Router = express.Router();
const signUp = require("../Controller/auth.controller.js")
const authRouter = Router.post("/signup", signUp).get("/logout", (req, res) => {
    res.send("Logout Page");
}).get("/login", (req, res) => {
    res.send("Login Page");
})

module.exports = authRouter;
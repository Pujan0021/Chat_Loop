const express = require("express");
const Router = express.Router();
const authRouter = Router.get("/signup", (req, res) => {
    res.send("SignUp Page");
}).get("/logout", (req, res) => {
    res.send("Logout Page");
}).get("/login", (req, res) => {
    res.send("Login Page");
})

module.exports = authRouter;
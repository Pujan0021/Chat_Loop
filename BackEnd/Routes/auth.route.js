const express = require("express");
const app = express();
const Router = express.Router();
const authRouter = Router.get("/signup", (req, res) => {
    res.send("SignUp Page");
}).get("/logout", (req, res) => {
    res.send("Logout Page");
}).get("/login", (req, res) => {
    res.send("Login Page");
})
const messageRouter = Router.get("/send", (req, res) => {
    res.send("Message Send Page");
}).get("/receive", (req, res) => {
    res.send("Message Receive Page");
})
module.exports = authRouter;
module.exports = messageRouter;
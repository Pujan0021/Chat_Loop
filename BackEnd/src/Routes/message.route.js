
const express = require("express");
const Router = express.Router();
const messageRouter = Router.get("/send", (req, res) => {
    res.send("Message Send Page");
}).get("/receive", (req, res) => {
    res.send("Message Receive Page");
})
module.exports = messageRouter;
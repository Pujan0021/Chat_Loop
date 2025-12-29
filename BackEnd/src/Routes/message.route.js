const protectRoute = require("../middleware/auth.middleware.js")
const express = require("express");
const Router = express.Router();
const arcjetProtection = require("../middleware/arcjet.middleware.js");
Router.use(arcjetProtection, protectRoute);
const { getAllContacts, getMessageByUserId, sendMessage, getChatPartners } = require("../Controller/message.controller.js");
Router.get("/contacts", getAllContacts);
Router.get("/chats", getChatPartners);
Router.get("/:id", getMessageByUserId);
Router.post("/send/:id", sendMessage);

module.exports = Router;
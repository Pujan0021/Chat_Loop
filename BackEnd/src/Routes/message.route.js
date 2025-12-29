const protectRoute = require("../middleware/auth.middleware.js")
const express = require("express");
const Router = express.Router();
const { getAllContacts, getMessageByUserId, sendMessage, getChatPartners } = require("../Controller/message.controller.js")
Router.get("/contacts", protectRoute, getAllContacts);
Router.get("/chats", protectRoute, getChatPartners);
Router.get("/:id", protectRoute, getMessageByUserId);
Router.post("/send/:id", protectRoute, sendMessage);

module.exports = Router;
const express = require("express");
const Router = express.Router();

const arcjetProtection = require("../middleware/arcjet.middleware.js");
const { signUp, logIn, logOut, updateProfilePic } = require("../Controller/auth.controller.js");
const protectRoute = require("../middleware/auth.middleware.js");


Router.use(arcjetProtection);
Router.post("/signup", signUp);
Router.post("/logout", logOut);
Router.post("/login", arcjetProtection, logIn);
Router.put("/update-profile", protectRoute, updateProfilePic);

module.exports = Router;
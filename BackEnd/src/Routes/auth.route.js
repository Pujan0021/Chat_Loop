const express = require("express");
const Router = express.Router();
const { signUp, logIn, logOut, updateProfile } = require("../Controller/auth.controller.js");
const protectRoute = require("../middleware/auth.middleware.js");
const authRouter = Router.post("/signup", signUp).post("/logout", logOut).post("/login", logIn).put("/update-profile", protectRoute, updateProfile)

module.exports = authRouter;
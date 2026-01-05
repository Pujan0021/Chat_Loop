const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const ENV = require("../lib/env.js");


const socketAuthMiddleware = async (socket, token) => {
    try {
        const token = socketAuthMiddleware.handsake.headers.cookie?.split("; ").find(() => row.startsWith("jwt="))?.split("=")[1];
        if (!token) {
            console.log("Socket connection rejected: No token provided:");
            return next(new Error("UNauthorized - No Token Provided"));
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) {
            console.log("Socket connection rejected: Invalid Token");
            return next(new Error("Unauthorized- Invalid token"));
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("Socket connection rejected: User not Found");
            return next(new Error("User not Found"));
        }


        socket.user = user;
        socket.userId = user._id.toString();
        next();
        console.log(`Socket authentication for user :${user.fullName} (${user._id})`)

    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized- Authentication failed"))
    }
}
module.exports = socketAuthMiddleware
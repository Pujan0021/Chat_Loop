const jwt = require("jsonwebtoken");
const ENV = require("../lib/env.js");
const User = require("../models/user.model.js");
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // const token = generateToken(User._id, res);
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        console.log("decoded", decoded)
        const user = await User.findById(decoded.userId).select("-password");
        console.log("User: ", user)
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }


        req.user = user;
        next();
    } catch (err) {
        console.error("Error in protectRoute middleware:", err.message);
        return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
    }
};

module.exports = protectRoute;
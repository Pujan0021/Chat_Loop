const jwt = require("jsonwebtoken");
const env = require(".../.env");
const User = require("../models/user.model.js")

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookie.jwt;
        if (!token) return res.status(401).json({
            message: "Unauthorized - No Token Provided"
        });
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (!decoded) return res.status(401).json({
            message: "Unauthorized - Invalid Token"
        });

        const user = await User.findById(decoded.userId).select("-password");
        //Select except password
        if (!user) return res.status(404).json({
            message: "User not Found"
        });
        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

}
module.exports = protectRoute;
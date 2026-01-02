const jwt = require("jsonwebtoken");
const ENV = require("./env.js")

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // true in prod, false in dev
    });

    return token;
};

module.exports = generateToken;
const jwt = require("jsonwebtoken");
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
        sameSite: "strict",
        secure: false // if in development false if in production true . http: development , https: production
    })
    return token;
}
module.exports = generateToken;
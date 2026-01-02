const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv")
const authRouter = require("./src/Routes/auth.route.js")
const messageRouter = require("./src/Routes/message.route.js");
const connectDB = require("./src/lib/db.js");
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const ENV = require("./src/lib/env.js");

//MiddleWares
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());// Should be before routers
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
const jwt = require("jsonwebtoken")

app.get("/api/auth/check", (req, res) => {
    const rawToken = req.cookies?.jwt || req.headers["authorization"];
    const token = rawToken?.startsWith("Bearer ") ? rawToken.split(" ")[1] : rawToken;

    if (!token) return res.status(401).json({ authenticated: false });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ authenticated: true, user: decoded });
    } catch {
        return res.status(401).json({ authenticated: false });
    }
});

//Server Connection
app.listen(PORT, () => {
    console.log('Server Started SuccessFully');
    connectDB();//DataBase Connection
})
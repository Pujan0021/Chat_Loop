const express = require("express");
const app = express();
const dotenv = require("dotenv")
const authRouter = require("./Routes/auth.route.js")
const messageRouter = require("./Routes/message.route.js")
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.listen(PORT, () => {
    console.log('Server Started SuccessFully');
})
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv")
const authRouter = require("./src/Routes/auth.route.js")
const messageRouter = require("./src/Routes/message.route.js");
const connectDB = require("./src/lib/db.js");
dotenv.config();
const PORT = process.env.PORT || 3000;

//MiddleWares
app.use(express.json());// Should be before routers
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);


//Server Connection
app.listen(PORT, () => {
    console.log('Server Started SuccessFully');
    connectDB();//DataBase Connection
})
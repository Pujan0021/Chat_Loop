const express = require("express");
const http = require("http");
const ENV = require("./env.js");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const { socketAuthMiddleware } = require("../middleware/socket.auth.middleware.js")
const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,

    },
});
io.use(socketAuthMiddleware);

const getReceiverSocketId = ((userId) => {
    return userSocketMap[userId]
});
const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("A user connection ", socket.user.fullName);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;
    io.emit("getOnLineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("A user disconnected ", socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
})
module.exports = { io, app, server, getReceiverSocketId }
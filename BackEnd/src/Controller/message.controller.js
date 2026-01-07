const { getReceiverSocketId, io } = require("../lib/socket.js");
const Message = require("../models/message.js");
const User = require("../models/user.model.js");
const { v2: cloudinary } = require("cloudinary"); // ensure correct import

// Get all contacts except the logged-in user
const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({ contacts: filterUsers });
    } catch (err) {
        console.error("Failed in getAllContacts:", err);
        res.status(400).json({ message: "Failed to Get Contacts" });
    }
};

// Get messages between logged-in user and another user
const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChat } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChat },
                { senderId: userToChat, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (err) {
        console.error("Error in getMessageByUserId:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Send a new message
const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat_images",
            });
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
            createdAt: Date.now(),
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        console.error("Error In Sending Message:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get all chat partners of logged-in user
const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
        });

        const chatPartnersIds = [...new Set(
            messages.map((msg) =>
                msg.senderId.toString() === loggedInUserId.toString()
                    ? msg.receiverId.toString()
                    : msg.senderId.toString()
            )
        )];

        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");

        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error In Chat Partners:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { getAllContacts, getMessageByUserId, sendMessage, getChatPartners };
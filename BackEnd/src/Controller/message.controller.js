const Message = require("../models/message.js");
const user = require("../models/user.model.js");
const { cloudinary } = require('cloudinary');
const getAllContacts = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const filterUsers = await user.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({
            contacts: filterUsers
        });
    } catch (err) {
        console.log("Failed in getAllContacts");
        res.status(400).json({
            message: "Failed to Get Contacts"
        })
    }
}
const getMessageByUserId = async (req, res) => {
    try {

        const myId = req.user._id;
        const { id: userToChat } = req.params;
        const message = await Message.fing({
            $or: [
                { senderId: myId, receiverId: userToChat },
                { senderId: userToChat, receiverId: myId }

            ]
        })
        res.status(200).json(message);
    } catch (err) {
        console.log("Error In Getting Message");
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat_images", // optional: organize uploads
            });
            imageUrl = uploadResponse.secure_url;
        }

        // Create a new message object
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            text,
            image: imageUrl,
            createdAt: Date.now(),
        });

        // Save to DB
        await newMessage.save();

        // Respond to client
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
const getChatPartners = async (req, res) => {
    try {

        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
        });
        const chatPartnersIds = [...new Set(
            messages.map((msg) =>
                msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString())
        )];
        const chatPartners = await user.find({ _id: { $in: chatPartnersIds } }).select("-password");
        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error In Chat PArtners: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
module.exports = { getAllContacts, getMessageByUserId, sendMessage, getChatPartners };
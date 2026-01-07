const validator = require("validator");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const generateToken = require("../lib/util.js");
const sendWelcomeEmail = require("../emails/emailHandlers.js");
const dotenv = require("dotenv");
const cloudinary = require("../lib/cloudinary.js");

dotenv.config();

// SIGN UP
const signUp = async (req, res) => {
    try {
        const { fullName, email, password, profilePic } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already taken" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePic,
        });

        const savedUser = await newUser.save();

        // Generate JWT
        const token = generateToken(savedUser._id, res);

        // Send welcome email (non-blocking)
        try {
            await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
        } catch (error) {
            console.error("Welcome email failed:", error.message);
        }

        return res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
            token, // include token explicitly
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Duplicate key" });
        }
        console.error("SignUp Failed:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// LOGIN
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(existingUser._id, res);

        return res.status(200).json({
            _id: existingUser._id,
            fullName: existingUser.fullName,
            email: existingUser.email,
            profilePic: existingUser.profilePic,
            token,
        });
    } catch (err) {
        console.error("Login Failed:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// LOGOUT
const logOut = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
};

// UPDATE PROFILE PIC
const updateProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture required" });
        }

        const userId = req.user._id;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // Update user profile picture
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating profile picture:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { signUp, logIn, logOut, updateProfilePic };
const validator = require("validator");
const user = require("../models/user.model.js")
const bcrypt = require("bcrypt");
const generateToken = require("../lib/util.js");
const sendWelcomeEmail = require("../emails/emailHandlers.js");
const dotenv = require('dotenv');
dotenv.config();
const signUp = async (req, res) => {
    try {

        const { fullName, email, password, profilePic } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All Fields are Required!"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least of 6 characters!"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Not a Valid Email!"
            })
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            console.log("User Already Exists");
            return res.status(400).send({
                message: "Email already Taken , Try another ....!"
            })
        }
        //Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new user({
            fullName,
            email,
            password: hashedPassword,
            profilePic
        })
        if (newUser) {

            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            console.log(`NewUser-> ${newUser.fullName} Created SuccessFully`);
            //SendWelcome Email
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL)

            } catch (error) {
                console.error("Welcome email failed:", error.message);

            };
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });



        } else {
            return res.status(400).json({
                message: "!!!!! Invalid User Data !!!!!"
            })
        }
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Duplicate Key" });
        }

        console.log(err.message, "!!!!! SignUp Failed !!!!!");
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }


};
const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {

        const User = await user.findOne({ email });
        if (!User) return res.status(400).json({
            message: "Invalid User Credentials!"
        });
        const isPasswordCorrect = await bcrypt.compare(password, User.password);
        if (!isPasswordCorrect) return res.status(400).json({
            message: "Invalid User Credentials!"
        });
        generateToken(User._id, res);
        return res.status(200).json({
            _id: User._id,
            fullName: User.fullName,
            email: User.email,
            profilePic: User.profilePic,
        });
    } catch (err) {
        console.log("Error in LogIn Controller", err.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    };


};

const logOut = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        message: "Logged Out SuccessFully...."
    });
};
const updateProfile = (req, res) => {

};
module.exports = { signUp, logIn, logOut, updateProfile };
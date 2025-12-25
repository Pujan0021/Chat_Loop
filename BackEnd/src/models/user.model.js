const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        require: true,
        unique: true,

    },

    email: {
        type: String,
        require: true,
        unique: true,

    },

    password: {
        type: String,
        require: true,
        unique: true,
        minLength: 8

    },

    profilePic: {
        type: String,
        default: ""
    },
},
    { timestamps: true }// createdAt and updatedAt
)
const user = mongoose.model("User", userSchema);
module.exports = user;
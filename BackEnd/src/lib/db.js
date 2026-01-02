const mongoose = require("mongoose");
const ENV = require("./env.js");

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.Mongo_URL);
        console.log("----- Connected To DataBase -------");
    } catch (err) {
        console.error("!!!!!!!!!!!!!!!!!!! Error Connecting To DataBase !!!!!!!!!!!", err.message);
        process.exit(1); // exit process if DB fails
    }
};

module.exports = connectDB;
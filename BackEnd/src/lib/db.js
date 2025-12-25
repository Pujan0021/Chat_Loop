const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log("SuccessFully Connected To MongoDB")
    } catch (err) {
        console.log("Error Connecting To MongoDB");
        process.exit(1); //1 means failed and 0 means success
    }
}
module.exports = connectDB;
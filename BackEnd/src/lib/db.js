const mongoose = require("mongoose");
const connectDB = async () => {
    // console.log(mongoose);

    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log("----- Connected To DataBase -------")
    } catch (err) {
        console.log("!!!!!!!!!!!!!!!!!!! Error Connecting To DataBase !!!!!!!!!!!");
        process.exit(1); //1 means failed and 0 means success
    }
}
module.exports = connectDB;
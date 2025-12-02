const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        if (process.env.NODE_ENV !== 'test') {
            console.log("MongoDB connected successfully");
        }
    }
    catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.error("MongoDB connection failed:", error);
        }
        process.exit(1);
    }       
}

module.exports = connectDB();
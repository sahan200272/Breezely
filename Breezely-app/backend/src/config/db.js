const mongoose = require("mongoose");

const connectDB = async () => {
  // Stop auto connect during tests
  if (process.env.NODE_ENV === "test") {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    // Prevent Jest from exiting
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;

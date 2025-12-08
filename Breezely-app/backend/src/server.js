const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const mainRoutes = require("./routes/mainRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());


app.use("/api", mainRoutes);

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

module.exports = app;
const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use("/api/users", userRoutes);

// Simple health route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Only start the HTTP server when not running tests.
if (process.env.NODE_ENV !== 'test') {
  db.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connected successfully");
  });
}

module.exports = app;

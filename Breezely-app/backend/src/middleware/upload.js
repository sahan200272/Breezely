const multer = require("multer");
const path = require("path");

// Set storage folder and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder to store files
    },
    filename: function (req, file, cb) {
        // Generate unique filename: timestamp-originalname
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Optional: filter for PDFs only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

// Multer upload instance
const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;

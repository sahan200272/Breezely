const Task = require("../models/task.model");
const cloudinary = require("../config/cloudinary"); // Cloudinary config

// Create a new task
exports.createTask = async (req, res) => {

    try {

        // for debugging
        /* console.log("Request body:", req.body);
        console.log("File received:", req.file);
        console.log("Uploaded file path:", req.file.path);
        console.log("File size:", req.file.size); */

        let pdfUrl = null;
        let pdfPublicId = null;

        // If a PDF is uploaded
        if (req.file) {

            // Convert buffer to Base64 string
            const base64Pdf = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

            // Upload to Cloudinary
            const uploadedPdf = await cloudinary.uploader.upload(base64Pdf, {
                resource_type: "auto",
                folder: "tasks/pdfs"  //organize files in folder
            });

            pdfUrl = uploadedPdf.secure_url;
            pdfPublicId = uploadedPdf.public_id;

        } else {
            console.log("No file uploaded.");
        }

        const newTask = new Task({
            title: req.body.title,
            note: req.body.note,
            category: req.body.category,
            date: req.body.date,
            remindDate: req.body.remindDate,
            remindTime: req.body.remindTime,
            pdfUrl,
            pdfPublicId
        });

        //save new tak on DB
        await newTask.save();

        res.status(200).json({
            message: "Task created successfully",
            task: newTask,
        });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

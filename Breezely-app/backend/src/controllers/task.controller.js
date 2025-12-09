const Task = require("../models/task.model");
const cloudinary = require("../config/cloudinary"); // Cloudinary config

// Create a new task
const createTask = async (req, res) => {

    try {

        // for debugging
        /* console.log("Request body:", req.body);
        console.log("File received:", req.file);
        console.log("Uploaded file path:", req.file.path);
        console.log("File size:", req.file.size); */

        let pdfs = [];

        // If a PDF is uploaded
        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const base64Pdf = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

                const uploadedPdf = await cloudinary.uploader.upload(base64Pdf, {
                    resource_type: "auto",
                    folder: "tasks/pdfs",
                });

                pdfs.push({
                    url: uploadedPdf.secure_url,
                    publicId: uploadedPdf.public_id
                });
            }
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
            pdfs
        });

        //save new tak on DB
        await newTask.save();

        res.status(200).json({
            message: "Task created successfully",
            task: newTask,
        });

    } catch (error) {
        res.status(500).json(
            {
                message: "Server error",
                error: error.message

            });
    }
};

// Update exisitng task

const updateTask = async (req, res) => {

    try {

        const { id } = req.params;
        const { title, note, category, date, remindDate, remindTime } = req.body;
        const files = req.files;

        // For checking data is coming or not
        /* console.log(id);
        console.log(req.body);
        console.log(files); */

        const pdfs = [];

        if (files && files.length > 0) {
            for (const file of files) {

                const base64Pdf = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

                const cloudinaryResponse = await cloudinary.uploader.upload(base64Pdf, {

                    resource_type: "auto",
                    folder: "tasks/pdfs"
                });

                pdfs.push({
                    url: cloudinaryResponse.secure_url,
                    publicId: cloudinaryResponse.public_id
                })
            }
        } else {
            console.log("No file uploaded.");
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {

            title: title,
            note: note,
            category: category,
            date: date,
            remindDate: remindDate,
            remindTime: remindTime,
            pdfs
        }, { new: true });

        res.status(200).json({
            message: "Task update success",
            updateTask: updatedTask
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

const getAllTasks = async (req, res) => {

    try {
        const tasks = await Task.find();

        if (tasks) {

            res.status(200).json({
                message: "tasks access success",
                tasks: tasks
            })
        } else {

            res.status(404).json({
                message: "tasks are not available"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

const getSingleTask = async (req, res) => {

    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (task) {
            res.status(200).json({
                message: "get a task success",
                task: task
            })
        }else{
            res.status(404).json({
                message: "Task can not find"
            })
        }
    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

module.exports = { createTask, updateTask, getAllTasks, getSingleTask };
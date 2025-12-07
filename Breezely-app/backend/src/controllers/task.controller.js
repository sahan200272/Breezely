const Task = require("../models/task.model");

const createTask = async (req, res) => {

    try{
        const { title, note, category, date, remindDate, remindTime } = req.body;
    const pdfs = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        size: file.size
    }));

    const newTask = await Task.create({
        title, note, category, date, remindDate, remindTime, pdfs
    });

    res.status(200).json({ message: "Task created", task: newTask });
    }catch(error){
        res.status(500).json({
            "message": "Server Error",
            "error": error.message
        })
    }
}

module.exports = {createTask};
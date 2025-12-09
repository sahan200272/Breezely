const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    note: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: Date
    },
    remindDate: {
        type: Date
    },
    remindTime: {
        type: String
    },
    pdfs: [
        {
            url: String,
            publicId: String
        }
    ],
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
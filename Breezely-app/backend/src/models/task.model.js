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
    pdfUrl: {
        type: String
    },
    pdfPublicId: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
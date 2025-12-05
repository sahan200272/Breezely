const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    familiarHand: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);
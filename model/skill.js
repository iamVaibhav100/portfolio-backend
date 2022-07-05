const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter a title for your new skill"]
    },
    percentage: {
        type: Number,
        required: [true, "Enter percentage for your new skill"]
    }
});

module.exports = mongoose.model("Skill", skillSchema);
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter a title for you project"]
    },
    desc: {
        type: String,
        required: [true, "Enter a description for you project"]
    },
    link: {
        type: String,
        required: [true, "Enter a link of you project"]
    },
    tag: [{
        type: String,
        required: [true, "Enter tags for you project"]
    }]
});

module.exports = mongoose.model("Project", projectSchema);
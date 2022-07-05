const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: String,
    email: String,
    password: String,
    about: {
        type: String,
        required: [true, "You have to enter about"]
    },
    tags: [{
        type: String,
    }]
});


module.exports = mongoose.model("User", userSchema);
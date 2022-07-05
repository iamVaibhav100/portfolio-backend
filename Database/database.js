const mongoose = require('mongoose');

const connectToDatabase = mongoose.connect(process.env.MONGODB);

module.exports = connectToDatabase;
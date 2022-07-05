const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectToDatabase = require('./Database/database');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./controls/errorHandler');
const adminRoute = require('./routes/adminRoute');
const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use("/iamvaibhav/admin", adminRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

connectToDatabase
    .then((data) => {
        console.log(`Connected to database ${data.connection.host}`);
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        })
    })
    .catch(err => {
        console.log("FAILED TO CONNECT TO THE DATABASE");
        console.log(err);
    });
const express = require('express');
const app = express();
const port = 5000;

const connectDB = require('./db/connect');

//Environment Variables
require('dotenv').config();

//Middleware
const notFound = require('./middleware/not-found');

app.use(notFound);
app.use(express.json());

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT || port, () => {
            return console.log(`App is listening at port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();

const express = require("express");
const app = express();
const port = 5000;

const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const productRouter = require("./routes/products");

//Environment Variables
require("dotenv").config();

//async error wrapper
require("express-async-errors");
//Routes
app.use("/api/v1/products", productRouter);

//Middleware
app.use(notFound);
// app.use(errorHandler);
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
};

start();

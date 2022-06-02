const express = require('express');
const app = express();
const port = 5000;

//Environment Variables
require('dotenv').config();

app.listen(process.env.PORT || port, () => console.log(`App is listening at port ${port}`));

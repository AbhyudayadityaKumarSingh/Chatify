const express = require('express');

const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();

connectDB();


const app = express();
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});
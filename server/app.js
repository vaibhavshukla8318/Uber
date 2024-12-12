const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require("./db/db");
const userRouter = require('./routers/user.router')

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/users', userRouter);

module.exports = app; 

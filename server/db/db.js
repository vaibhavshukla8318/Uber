const mongoose = require('mongoose');

const URI = process.env.DB_CONNECT;

const connectDB = async(req, res) =>{
  try {
     await mongoose.connect(URI);
     console.log("database connected successfully");
  } catch (error) {
    console.log("failed to connect database", error);
  }
}

module.exports = connectDB;
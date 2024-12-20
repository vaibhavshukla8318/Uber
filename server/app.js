const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./db/db");
const userRouter = require('./routers/user.router')
const driverRouter = require('./routers/driver.router');
const mapRoutes = require('./routers/maps.routes');
const rideRoutes= require('./routers/ride.router');

const app = express();

connectDB();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/users', userRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/maps', mapRoutes)
app.use('/api/rides', rideRoutes);

module.exports = app; 

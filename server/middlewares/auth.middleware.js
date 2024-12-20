// Auth Middleware

const userModel = require('../models/user.model');
const driverModel = require('../models/driver.model');
const expireTokenModel  = require('../models/expireToken.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Unathorized.' });
  }

  const isExpired = await expireTokenModel.findOne({ token: token});

  if (isExpired) {
    return res.status(401).json({ message: 'Access denied. Token expired.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unathorized"}, error)
  }
}

module.exports.authDriver = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Unathorized.' });
  }

  const isExpired = await expireTokenModel.findOne({ token: token});

  if (isExpired) {
    return res.status(401).json({ message: 'Access denied. Token expired.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await driverModel.findById(decoded._id);

    if (!driver) {
      return res.status(404).json({ message: 'driver not found.' });
    }
    req.driver = driver;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unathorized"}, error)
  }
}
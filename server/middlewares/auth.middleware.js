const userModel = require('../models/user.model');
const driverModel = require('../models/driver.model');
const expireTokenModel = require('../models/expireToken.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Unauthorized.' });
  }

  const isExpired = await expireTokenModel.findOne({ token });

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
    console.error('Auth User Error:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports.authDriver = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Unauthorized.' });
  }

  const isExpired = await expireTokenModel.findOne({ token });

  if (isExpired) {
    return res.status(401).json({ message: 'Access denied. Token expired.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await driverModel.findById(decoded._id);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    req.driver = driver;
    next();
  } catch (error) {
    console.error('Auth Driver Error:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

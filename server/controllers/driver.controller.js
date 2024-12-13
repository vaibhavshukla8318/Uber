// driver controller

const {validationResult} = require('express-validator');
const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const expireTokenModel = require('../models/expireToken.model');

module.exports.registerDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const {fullname, email, password, vehicle} = req.body;

  const existingDriver = await driverModel.findOne({email});
  if (existingDriver) {
    return res.status(400).json({message: 'Driver already exists with this email'});
  }

  const hashPassword = await driverModel.hashPassword(password);

  const driver = await driverService.createDriver({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
  });

  const token = driver.generateAuthToken();

  res.status(201).json({token, driver});
}


module.exports.loginDriver = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const {email, password} = req.body;

  const driver = await driverModel.findOne({email}).select('+password');
  if(!driver){
    return res.status(401).json({message: 'Invalid email or password'});
  }

  const isMatch = await driver.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message: 'Invalid email or password'});
  }

  const token = driver.generateAuthToken();

  res.status(200).json({token, driver});
}


module.exports.getDriverProfile = async (req, res, next) => {
  res.status(200).json(req.driver);
}


module.exports.logoutDriver = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  
  await expireTokenModel.create({token});
  res.status(200).json({message: 'Logged out successfully'});
}
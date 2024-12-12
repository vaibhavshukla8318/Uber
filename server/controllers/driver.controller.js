// driver controller

const {validationResult} = require('express-validator');
const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');

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

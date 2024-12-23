// ride.controller

const rideService = require('../services/ride.service');
const getFare = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapsService = require('../services/maps.services')
const {sendMessageToSocketId} = require("../socket")
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const { pickup, destination, vehicleType} = req.body;
  try {
    const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
    res.status(201).json(ride);

    const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
    console.log("this is a pickup coordinate", pickupCoordinates)


    // Find drivers in the radius
    const driverInRadius = await mapsService.getDriversInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2000);

    ride.otp = ""

    const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

    driverInRadius.map(driver =>{
      sendMessageToSocketId(driver.socketId, {
        event: "new-ride",
        data: rideWithUser
      })
    })

    
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: error.message});
  }
}

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  
  const { pickup, destination} = req.query;

  try {
    const fare = await getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: error.message});
  }

}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({rideId, driver: req.driver});

    sendMessageToSocketId(ride.user.socketId, {
      event:'ride-confirmed',
      data: ride
    })

    res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: error.message});
  }
}

module.exports.startRide = async (req, res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({rideId, otp, driver: req.driver});
    sendMessageToSocketId(ride.user.socketId, {
      event:'ride-started',
      data: ride
    })
    res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: error.message});
  
}
}


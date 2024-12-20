const { verify } = require('jsonwebtoken');
const rideModel = require('../models/ride.model');
const mapService = require('./maps.services');
const crypto = require('crypto')

async function getFare(pickup, destination) {
  if(!pickup || !destination){
    throw new Error('Pickup and destination are required');
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto:30,
    car:50,
    bike:20
  }

  const perKmRate = {
    auto:8,
    car:12,
    bike:5
  }

  const perMinRate ={
    auto:2,
    car:4,
    bike:1
  }

  const fare = {
    auto: baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinRate.auto),

    car: baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinRate.car),

    bike: baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + ((distanceTime.duration.value / 60) * perMinRate.bike)
  }

  return fare;
}

function getOtp(num){
  function generateOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user, pickup, destination, vehicleType
})=>{
  if(!user || !pickup || !destination || !vehicleType){
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp:getOtp(6),
    fare: fare[vehicleType]
  })

  return ride;
}
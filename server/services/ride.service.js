// ride.services

const { verify } = require('jsonwebtoken');
const rideModel = require('../models/ride.model');
const mapService = require('./maps.services');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

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
    auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinRate.auto)),

    car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinRate.car)),

    bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + ((distanceTime.duration.value / 60) * perMinRate.bike))
  }

  return fare;
}

module.exports = getFare;

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

module.exports.confirmRide = async ({rideId, driver})=>{
  if(!rideId){
    throw new Error('Ride id is required');
  }

   await rideModel.findOneAndUpdate({_id:rideId},
    {
      status: 'accepted',
      driver: driver._id
    }
   )
   const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('driver').select('+otp');
   if(!ride){
     throw new Error('Ride not found');
   }

    return ride;

}


module.exports.startRide = async({rideId, otp, driver}) =>{
  if(!rideId ||!otp){
    throw new Error('Ride id and OTP are required');
  }
  const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('driver').select('+otp');
  if(!ride){
    throw new Error('Ride not found');
    }
    if(ride.otp !== otp){
      throw new Error('Invalid OTP');
    }
    if(ride.status !== 'accepted'){
      throw new Error('Ride not accepted');
    }

    await rideModel.findOneAndUpdate({_id:rideId},
      {
        status: 'ongoing'
      }
    )

    sendMessageToSocketId(ride.user.socketId, {
      event:'ride-started',
      data: ride
    })

    return ride;
    
}
// maps.controller

const mapServices = require('../services/maps.services');
const {validationResult} = require('express-validator');

 module.exports.getCoordinates = async (req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const {address} = req.query;

  try {
    const coordinates = await mapServices.getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({message: 'coordinates not found'});
  }
}

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({errors: error.array()});
    }
    const {origin, destination} = req.query;
    const distanceTime = await mapServices.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error in calculating distance and time'});
  }
}

module.exports.getAutoCompleteSuggestions = async (req,res, next) =>{
  try {
    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({errors: error.array()});
    }
    const {input} = req.query;
    const suggestions = await mapServices.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error in getting auto complete suggestions'});
  }
}
// map.services.js
const axios = require('axios');
const driverModel = require('../models/driver.model')

// Function to get coordinates from an address using Google Maps Geocoding API
const getAddressCoordinates = async (address) => {
  try {
    const API_KEY = process.env.GOOGLE_MAPS_API;
    // Base URL for Google Maps Geocoding API
    const baseURL = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    console.log(baseURL)

    //  GET request to the Google Maps Geocoding API
    const response = await axios.get(baseURL);

    // Check for successful response
    if (response.data.status === 'OK') {
     
      const location = response.data.results[0].geometry.location;

      if (!location || isNaN(location.lat) || isNaN(location.lng)) {
        throw new Error('Invalid coordinates from API');
    }
      // Return latitude and longitude
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      // Handle any API errors
      throw new Error(`Error from Google Maps API: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error; // Re-throw the error for handling
  }
};

const getDistanceTime = async (origin, destination) =>{
  if(!origin || !destination){
    throw new Error('Origin and destination are required');
  }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const baseURL = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await axios.get(baseURL);
      if(response.data.status === 'OK'){
        if( response.data.rows[0].elements[0].status === 'ZERO_RESULTS' ){
          throw new Error('No route found between the two points');
        }
       return response.data.rows[0].elements[0]
      } else {
        throw new Error(`Error from Google Maps API: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Error fetching distance and time:', error.message);
      throw error;
    }
}

const getAutoCompleteSuggestions = async(input) =>{
  if(!input){
    throw new Error('Input is required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const baseURL = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

  try {
    const response = await axios.get(baseURL);
    if(response.data.status === 'OK'){
      return response.data.predictions
    } else {
      throw new Error(`Error from Google Maps API: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error.message);
    throw error;
  }
}


const getDriversInTheRadius = async (lat, lng, radius) =>{


  // radius in km
  const driver = await driverModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          [lat, lng],
          radius / 6371 
        ]
      }
    }
  }) 
  return driver;
}

module.exports = { getAddressCoordinates, getDistanceTime, getAutoCompleteSuggestions, getDriversInTheRadius };

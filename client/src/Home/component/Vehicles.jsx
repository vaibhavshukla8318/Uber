/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../css/vehicle.css';
import RideDetails from './RideDetails';

const Vehicles = ({ onBack, fare, pickup, destination }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Update initial state to hold vehicle details

  const handleClick = (vehicle) => {
    setSelectedVehicle(vehicle); // Set the selected vehicle data
  };

  const vehicleList = [
    {
      name: 'car',
      image: 'http://pluspng.com/img-png/car-png-car-png-picture-2208.png',
      fare: fare.car,
      seat:'👤4'
    },
    {
      name: 'bike',
      image: 'http://pluspng.com/img-png/png-hd-bike-suzuki-hayabusa-sport-motorcycle-bike-png-image-1632.png',
      fare: fare.bike,
      seat:"👤2"
    },
    {
      name: 'auto',
      image: 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png',
      fare: fare.auto,
      seat:"👤3"
    },
  ];

  return (
    <div className="vehicle-list">
      {!selectedVehicle ? (
        <>
          <div className="previous-button">
            <button onClick={onBack}>⬅</button>
            <p>Choose Vehicle</p>
          </div>
          <div className="bottom-border"></div>
          <div className="vehicle-item-container">
            {vehicleList.map((vehicle, index) => (
              <div
                key={index}
                className="vehicle-item"
                onClick={() => handleClick(vehicle)} // Pass the vehicle data on click
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="vehicle-image"
                />
                <div className="vehicle-info">
                  <p className="vehicle-name">{vehicle.name} {vehicle.seat}</p>
                  <p className="vehicle-away">2 mins away</p>
                </div>
                <div className="vehicle-price">
                  <p>₹{vehicle.fare}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <RideDetails
          fare={fare}
          pickup={pickup}
          destination={destination}
          vehicle={selectedVehicle} // Pass the selected vehicle to RideDetails
          onBack={() => setSelectedVehicle(null)} // Go back to vehicle selection
        />
      )}
    </div>
  );
};

export default Vehicles;

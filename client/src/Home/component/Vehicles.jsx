import React, { useState } from 'react';
import '../css/vehicle.css';
import RideDetails from './RideDetails';

const vehicleData = [
  {
    id: 1,
    name: "Car 👤4",
    image: "http://pluspng.com/img-png/car-png-car-png-picture-2208.png",
    time: "2 mins away",
    price: "₹50/day",
  },
  {
    id: 2,
    name: "Bike 👤2",
    image: "http://pluspng.com/img-png/png-hd-bike-suzuki-hayabusa-sport-motorcycle-bike-png-image-1632.png",
    time: "5 mins away",
    price: "₹30/day",
  },
  {
    id: 3,
    name: "Auto 👤3",
    image: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
    time: "3 mins away",
    price: "₹30/day",
  },
  {
    id: 5,
    name: "Car 👤4",
    image: "http://pluspng.com/img-png/car-png-car-png-picture-2208.png",
    time: "2 mins away",
    price: "₹50/day",
  },
  {
    id: 6,
    name: "Auto 👤3",
    image: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
    time: "3 mins away",
    price: "₹30/day",
  }
];

const Vehicles = ({ onBack }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="vehicle-list">
      {!selectedVehicle ? (
        <>
          <div className='previous-button'>
            <button onClick={onBack}>⬅</button>
            <p>Choose Vehicle</p>
          </div>
          <div className="bottom-border"></div>
          <div className="vehicle-item-container">
            {vehicleData.map((vehicle) => (
              <div
                className="vehicle-item"
                key={vehicle.id}
                onClick={() => handleSelect(vehicle)}
              >
                <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
                <div className="vehicle-info">
                  <p className="vehicle-name">{vehicle.name}</p>
                  <p className="vehicle-away">{vehicle.time}</p>
                </div>
                <div className="vehicle-price">
                  <p>{vehicle.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <RideDetails vehicle={selectedVehicle} onBack={() => setSelectedVehicle(null)} />
      )}
    </div>
  );
};

export default Vehicles;

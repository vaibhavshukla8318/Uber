/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../css/rideDetails.css';
import ConfirmRide from './ConfirmRide';  // Import the new PaymentDetails component
import { gsap } from 'gsap';

const RideDetails = ({ vehicle, onBack }) => {
  const [showPayment, setShowPayment] = useState(false);

  const handleConfirm = () => {
    setShowPayment(true); // Show the PaymentDetails component when confirmed
    // gsap.to(".confirm-ride", { opacity:"0.5", duration: 0.5 });
  };

  return (
    <>
    {showPayment ? (
      <ConfirmRide vehicle={vehicle} onBack={() => setShowPayment(false)} />
    ) : (
    <div className="confirm-ride">
      <div className='confirm-ride-button'>
        <button className="back-button" onClick={onBack}>⬅</button>
        <p>Confirm your Ride</p>
      </div>
      <div className='border-bottom'></div>

     
        <div className="ride-details">
          <div className='vehicleDetails'>
            <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
            <h2>{vehicle.name}</h2>
            <p>Time: {vehicle.time}</p>
            <p>Price: {vehicle.price}</p>
          </div>

          <div>
            <div className='userLocation'>
              📍
              <div>
                <p>From: {vehicle.from}</p>
                <small>location</small>
              </div>
            </div>
            <div className='userDestination'>
              🎯
              <div>
                <p>To: {vehicle.to}</p>
                <small>destination</small>
              </div>
            </div>
            <div className='confirmPrice'>
              💳
              <div>
                <p>{vehicle.price}</p>
                <small>Cash/Online</small>
              </div>
            </div>
          </div>
          <button className="confirm-button" onClick={handleConfirm}>Confirm Ride</button>
        </div>
        </div>
      )}
      </>
  );
};

export default RideDetails;

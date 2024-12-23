/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../css/rideDetails.css';
import ConfirmRide from './ConfirmRide'; // Import the new PaymentDetails component
import { useAuth } from '../../store/auth';
import { useSocket } from '../../store/SocketContext';

const LookingForDriver = ({ onBack, pickup, destination, vehicle }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [rideConfirm, setRideConfirm] = useState(null);
  const [loading, setLoading] = useState(false); // To show a loading state
  const [error, setError] = useState(null); 

  const {socket} = useSocket();
  console.log("socket", socket)
  
  socket.on('ride-confirmed', (data) =>{
    setRideConfirm(data);
    setShowPayment(true);
  })
   



  console.log("this is a confirm ride", rideConfirm);
  
  
  return (
    <>
      {showPayment ? (
        <ConfirmRide vehicle={vehicle} rideConfirm= {rideConfirm} />
      ) : (
        <div className="confirm-ride">
          <div className="confirm-ride-button">
            <button className="back-button" onClick={onBack}>
              ⬅
            </button>
            <p>Looking for Driver</p>
          </div>
          <div className="border-bottom"></div>

          <div className="ride-details">
            <div className="vehicleDetails">
              <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
              <h2>{vehicle.name} {vehicle.seat}</h2>
              <p>Price: ₹{vehicle.fare}</p>
            </div>

            <div>
              <div className="userLocation">
                📍
                <div>
                  <p>From: {pickup}</p>
                  <small>location</small>
                </div>
              </div>
              <div className="userDestination">
                🎯
                <div>
                  <p>To: {destination}</p>
                  <small>destination</small>
                </div>
              </div>
              <div className="confirmPrice">
                💳
                <div>
                  <p>₹{vehicle.fare}</p>
                  <small>Cash/Online</small>
                </div>
              </div>
              <button className='btn'>pending...</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LookingForDriver
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../css/rideDetails.css';
import LookingForDriver from './LookingForDriver';
import { useAuth } from '../../store/auth';

const RideDetails = ({ onBack, pickup, destination, vehicle }) => {
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [loading, setLoading] = useState(false); // To show a loading state
  const [error, setError] = useState(null); // To handle errors

  const { API, authorizationToken } = useAuth(); // Use the Auth provider hook


  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
  
    const vehicleType = vehicle.name;
  
    // Validate input
    if (!pickup || !destination || !vehicleType) {
      setError('Please provide all required fields.');
      setLoading(false);
      return;
    }
  
  
    try {
      const response = await fetch(`${API}/api/rides/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          pickup,
          destination,
          vehicleType,
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create ride');
      }
  
      console.log('Ride created successfully:', responseData);
      setLookingForDriver(true);
    } catch (err) {
      console.error('Error creating ride:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <>
      {lookingForDriver ? (
        <LookingForDriver pickup={pickup} vehicle={vehicle} destination={destination} onBack={() => setLookingForDriver(false)} />
      ) : (
        <div className="confirm-ride">
          <div className="confirm-ride-button">
            <button className="back-button" onClick={onBack}>
              ⬅
            </button>
            <p>Confirm your Ride</p>
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
            </div>

            {error && <p className="error-message">Error: {error}</p>}
            <button className="confirm-button" onClick={handleConfirm} disabled={loading}>
              {loading ? 'Creating Ride...' : 'Confirm Ride'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RideDetails;

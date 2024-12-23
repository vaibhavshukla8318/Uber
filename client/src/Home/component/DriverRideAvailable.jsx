/* eslint-disable react/prop-types */
import React, {useRef} from 'react'
import { gsap } from "gsap";
import ConfirmToStart from './ConfirmToStart';
import { useAuth } from '../../store/auth';

const DriverRideAvailable = ({ride}) => {
  const expandRef = useRef(null);
  const collapseRef = useRef(null);

  const { API, authorizationToken } = useAuth();

  const handleExpand = async () => {
    try {
      // Send the confirmation request
      const response = await fetch(`${API}/api/rides/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken, // Include token for authentication
        },
        body: JSON.stringify({ rideId: ride._id }), // Send the ride ID
      });

      if (!response.ok) {
        throw new Error('Failed to confirm ride');
      }

      const data = await response.json();
      console.log('Ride confirmed:', data);

      // Expand the UI on successful confirmation
      gsap.to(expandRef.current, { top: '15%', duration: 0.5 });
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  
  const handleCollapse = () => {
    // Collapse the full-height container
    gsap.to(collapseRef.current, { top: "100%", duration: 0.5 });
  };

  console.log("this is a ride", ride)
  return (
    <>
      <div className='ride' ref={collapseRef}>
        <div className="rideDetails">
          <p>New Ride Available!</p>
          <div className="userDetails">
            <div className="user">
              <img src="https://tse3.mm.bing.net/th?id=OIP.I0aGaUAvbHC26eR6AgYEIQAAAA&pid=Api&P=0&h=180" alt="userImage" />
              <p>{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}</p>
            </div>
            <p>3.5KM</p>
          </div>
          <div className="ride-info">

          <div className="destination-info">
            <div className='userLocation'>
              📍
              <div>
                <p>From: {ride?.pickup}</p>
                <small>location</small>
              </div>
            </div>
            <div className="user-destination">
              🎯
              <div>
                <p>To: {ride?.destination}</p>
                <small>Drop-off Location</small>
              </div>
            </div>
            <div className="ride-price">
              💳
              <div>
                <p>Price: {ride?.fare}</p>
                <small>Cash/Online</small>
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <button className="ignore" onClick={handleCollapse}>Ignore</button>
            <button className="accept" onClick={handleExpand}>Accept</button>
          </div>
          </div>
        </div>
      </div>
      <div className='confirmToStart' ref={expandRef}>
          <ConfirmToStart ride={ride} />
        </div>
    </>
  )
}

export default DriverRideAvailable
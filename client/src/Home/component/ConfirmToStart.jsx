import React, {useRef, useState} from 'react'
import { gsap } from "gsap";
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

const ConfirmToStart = ({ride}) => {
  const [otp, setOtp] = useState('');
  const { API, authorizationToken } = useAuth(); // Get API base URL and auth token from context

  const navigate = useNavigate();

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleConfirmClick = async () => {
    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }

    try {
      const rideId = ride._id; // Replace this with the actual ride ID as required
      const response = await fetch(`${API}/api/rides/start-ride?rideId=${rideId}&otp=${otp}`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Ride started successfully!');
        navigate('/confirm-ride')
        console.log('Ride started:', data);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to start ride');
      }
    } catch (error) {
      console.error('Error starting ride:', error);
      toast.error('An error occurred while starting the ride');
    }
  };
 
  return (
      <div className="rideDetails">
        <p>Confirm this ride to Start</p>
        <div className="userDetails">
          <div className="user">
            <img src="https://tse3.mm.bing.net/th?id=OIP.I0aGaUAvbHC26eR6AgYEIQAAAA&pid=Api&P=0&h=180" alt="userImage" />
            <p>Alex Justine</p>
          </div>
          <p>3.5KM</p>
        </div>
        <div className="ride-info">

        <div className="destination-info">
          <div className='userLocation'>
            📍
            <div>
              <p>From: New York</p>
              <small>location</small>
            </div>
          </div>
          <div className="user-destination">
            🎯
            <div>
              <p>To: Times Square</p>
              <small>Drop-off Location</small>
            </div>
          </div>
          <div className="ride-price">
            💳
            <div>
              <p>Price: </p>
              <small>Cash/Online</small>
            </div>
          </div>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={handleOtpChange}
          />
        </div>
        <button className="confirmButton" onClick={handleConfirmClick}>
          Confirm
        </button>
        </div>
      </div>
  )
}

export default ConfirmToStart
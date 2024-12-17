import React, {useRef} from 'react'
import { gsap } from "gsap";
import {Link} from 'react-router-dom'

const ConfirmToStart = () => {
 
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
        <div className='inputContainer'>
          <input type="text" placeholder="Enter your OTP" />
        </div>

        <Link to="/confirm-ride">
          <button className='confirmButton'>Confirn</button>
        </Link>
        </div>
      </div>
  )
}

export default ConfirmToStart
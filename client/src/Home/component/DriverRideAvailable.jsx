import React, {useRef} from 'react'
import { gsap } from "gsap";
import ConfirmToStart from './ConfirmToStart';

const DriverRideAvailable = () => {
  const expandRef = useRef(null);
  const collapseRef = useRef(null);

  const handleExpand = () => {
    // Collapse the full-height container
    gsap.to(expandRef.current, { top: "15%", duration: 0.5 });
  };
  const handleCollapse = () => {
    // Collapse the full-height container
    gsap.to(collapseRef.current, { top: "100%", duration: 0.5 });
  };
  return (
    <>
      <div className='ride' ref={collapseRef}>
        <div className="rideDetails">
          <p>New Ride Available!</p>
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

          <div className="buttonContainer">
            <button className="ignore" onClick={handleCollapse}>Ignore</button>
            <button className="accept" onClick={handleExpand}>Accept</button>
          </div>
          </div>
        </div>
      </div>
      <div className='confirmToStart' ref={expandRef}>
          <ConfirmToStart/>
        </div>
    </>
  )
}

export default DriverRideAvailable
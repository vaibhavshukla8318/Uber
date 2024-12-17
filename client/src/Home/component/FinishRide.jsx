import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/finishRide.css";

const FinishRide = () => {
  const [isCompleted, setIsCompleted] = useState(false); // For showing checkmark
  const navigate = useNavigate(); // Navigation hook

  const handleCompleteRide = () => {
    setIsCompleted(true); // Show checkmark

    // After 2 seconds, navigate to the Driver Page
    setTimeout(() => {
      navigate("/driver"); // Change to the correct route
    }, 5000);
  };

  return (
    <div className="rideDetails">
      <p>Finish this Ride</p>
      <div className="userDetails">
        <div className="user">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.I0aGaUAvbHC26eR6AgYEIQAAAA&pid=Api&P=0&h=180"
            alt="userImage"
          />
          <h3>Alex Justine</h3>
        </div>
        <p>3.5KM</p>
      </div>
      <div className="ride-info">
        <div className="destination-info">
          <div className="userLocation">
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

        {/* Button with checkmark animation */}
        <button
          className={`confirmButton ${isCompleted ? "completed" : ""}`}
          onClick={handleCompleteRide}
          disabled={isCompleted} // Prevent multiple clicks
        >
           {isCompleted ? <div className="circle-loader"></div> : "Complete Ride"}
        </button>
      </div>
    </div>
  );
};

export default FinishRide;

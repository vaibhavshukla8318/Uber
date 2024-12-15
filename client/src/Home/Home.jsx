import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import Vehicles from "./component/Vehicles";
import "./css/home.css";


const locations = [
  {
    icon: "📍",
    location: "Central Park, New York",
    distance: "2.5 miles"
  },
  {
    icon: "📍",
    location: "Times Square, New York",
    distance: "3.1 miles"
  },
  {
    icon: "📍",
    location: "Statue of Liberty, New York",
    distance: "6.8 miles"
  },
  {
    icon: "📍",
    location: "Brooklyn Bridge, New York",
    distance: "5.2 miles"
  },
  {
    icon: "📍",
    location: "Empire State Building, New York",
    distance: "4.0 miles"
  }
];




const Home = () => {
  const [vehicle, setVehicle]= useState(false);
  const notFullHeightRef = useRef(null);
  const fullHeightRef = useRef(null);

  const handleExpand = () => {
    // Expand the full-height container
    gsap.to(fullHeightRef.current, { top: "0", display:"flex", duration: 0.5 });
  };

  const handleCollapse = () => {
    // Collapse the full-height container
    gsap.to(fullHeightRef.current, { top: "100%", duration: 0.5 });
  };

  const handleClick = () => {
    setVehicle(true);
  }

  const handleBack = () => {
    setVehicle(false);
  };

  return (
    <div className="home">
      <div className="image-container">
        <img
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt="Background"
          className="background-image"
        />
      </div>

      {/* Not Full Height Container */}
      <div
        className="inputs-container not-full-height"
        ref={notFullHeightRef}
      >
        <div className="input-boxes">
          <input
            type="text"
            placeholder="Enter Destination"
            className="input"
            onClick={handleExpand}
          />
          <input
            type="text"
            placeholder="Enter Location"
            className="input"
            onClick={handleExpand}
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Full Height Container */}
      {!vehicle ? (
        <div
        className="inputs-container full-height"
        ref={fullHeightRef}
      >
         {/* Arrow for Collapsing */}
         <div className="arrow-container">
          <p>Traveller</p>
          <button className="collapse-arrow" onClick={handleCollapse}>
            ▼
          </button>
        </div>
        <div className="bottom-border">

        </div>

        <div className="input-boxes">
          <input type="text" placeholder="Enter Destination" className="input" />
          <input type="text" placeholder="Enter Location" className="input" />
          <button className="search-button">Search</button>
        </div>


        <div className="locations-list">
          {locations.map((item, index) => (
            <div className="location-item" key={index} onClick={handleClick}>
              <span className="location-icon">{item.icon}</span>
              <div className="location-info">
                <p className="location-name">{item.location}</p>
                <p className="location-distance">{item.distance}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      ) :
      <Vehicles onBack={handleBack}  />
      }
    </div>
  )
}

export default Home;

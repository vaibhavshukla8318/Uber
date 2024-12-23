import { useRef, useState, useEffect
 } from "react";
import { gsap } from "gsap";
import Vehicles from "./component/Vehicles";
import "./css/home.css";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../store/auth";
import { useSocket } from "../store/SocketContext";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [vehicle, setVehicle]= useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState(null);;
  const [suggestions, setSuggestions] = useState([]);
  const [field, setField] = useState(null); 
  const notFullHeightRef = useRef(null);
  const fullHeightRef = useRef(null);

  const {user, API, authorizationToken, logout} = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !user) return;
    socket.emit('join', {
      userId: user._id, 
      userType: 'user',
  });
  }, [user, socket]);

  const handleExpand = (field) => {
    setField(field);
    gsap.to(fullHeightRef.current, { top: "0", display:"flex", duration: 0.5 });
  };

  const handleCollapse = () => {
    gsap.to(fullHeightRef.current, { top: "100%", duration: 0.5 });
  };


  const handleBack = () => {
    setVehicle(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  }

  const fetchData = async (input) => {
    try {
      const response = await fetch(`${API}/api/maps/get-suggstions?input=${input}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
  
      if (!response.ok) {
        console.error("Error fetching suggestions:", response.statusText);
        setSuggestions([]); // Clear suggestions on error
        return;
      }
  
      const data = await response.json();
      setSuggestions(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Clear suggestions on exception
    }
  };
  

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "pickup") {
      setPickup(value);
    } else {
      setDestination(value);
    }
    if (value.length >= 3) {
      fetchData(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (field === "pickup") {
      setPickup(suggestion.description);
    } else {
      setDestination(suggestion.description);
    }
    setSuggestions([]); // Clear suggestions after selection
  };


  const handleClick = async () => {
    try {
      const response = await fetch(
        `${API}/api/rides/get-fare?pickup=${pickup}&destination=${destination}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
  
      if (!response.ok) {
        console.error("Backend Error:", response.status, response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log("Received fare data:", data);
      setFare(data); // Set the fare returned from the backend
      setVehicle(true);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };


  
  return (
    <div className="home">
      <button className="logoutButton" onClick={handleLogout}>
       <IoMdLogOut />
      </button>
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
            value={destination}
            onChange={(e) => handleInputChange(e, "destination")}
            onClick={() => handleExpand("destination")}
          />
          <input
            type="text"
            placeholder="Enter Location"
            className="input"
            value={pickup}
            onChange={(e) => handleInputChange(e, "pickup")}
            onClick={() => handleExpand("pickup")}
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
        <div className="bottom-border"></div>

          <div className="input-boxes">
          <input
            type="text"
            placeholder="Enter Location"
            className="input"
            value={pickup}
            onChange={(e) => handleInputChange(e, "pickup")}
            onClick={() => handleExpand("pickup")}
          />
          <input
            type="text"
            placeholder="Enter Destination"
            className="input"
            value={destination}
            onChange={(e) => handleInputChange(e, "destination")}
            onClick={() => handleExpand("destination")}
          />
          <button className="search-button" onClick={handleClick}>Search</button>
        </div>
          

        <div className="locations-list">
          {Array.isArray(suggestions) && suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <div
                className="location-item"
                key={index}
                onClick={() => handleSuggestionClick(item)}
              >
                <span className="location-icon">📍</span>
                <p className="location-name">{item.description}</p>
              </div>
            ))
          ) : (
            <p>No suggestions available</p>
          )}
        </div>


      </div>
      ) :
      <Vehicles 
        onBack={handleBack}   
        fare={fare}
        pickup={pickup}
        destination={destination}
      />
      }
    </div>
  )
}

export default Home;

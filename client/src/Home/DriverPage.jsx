import "./css/driverPage.css";
import { useEffect, useState } from "react";
import { CgTimer, CgNotes } from "react-icons/cg";
import { RiTimer2Line } from "react-icons/ri";
import DriverRideAvailable from "./component/DriverRideAvailable";
import { useAuth } from "../store/auth";
import { useSocket } from "../store/SocketContext";


const DriverPage = () => {
  const [driverRideAvailable, setDriverRideAvailable] = useState(false)
  const [ride, setRide] = useState(null);
  const { driver} = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket || !driver || !driver._id) return;
    

    // Emit 'join' event to the server
    socket.emit('join', {
      userId: driver._id, 
      userType: 'driver',
  });

    const updateLocation = () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

          console.log({
            userId: driver._id,
            location:{
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          })
          socket.emit('update-location-driver', {
            userId: driver._id,
            location:{
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          })
        })
      }
    }

    // const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    // return () => clearInterval(locationInterval);
    socket.on('new-ride', (data) =>{
      setRide(data);
      setDriverRideAvailable(true);
    })
  

   
  }, [socket, driver]);

  
  
  return (

    <div className="driver">
      <img src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
      {
        !driverRideAvailable? (
          <>
            <div className="driverWorks">
              <div className="driverDetails">
                <div className="driverImage">
                  <img src="https://images4.alphacoders.com/262/262196.jpg" alt="image" />
                  <p>
                  {driver.fullname?.firstname} {driver.fullname?.lastname}
                  </p>
                </div>
                <div className="totalEarn">
                <p>₹350</p>
                <small>Earned</small>
                </div>
              </div>
              <div className="totalWorks">
                <div>
                  <RiTimer2Line className="icon" />
                  <p>13.5</p>
                  <small>Hours Online</small>
                </div>
                <div>
                  <CgTimer className="icon"  />
                  <p>13.5</p>
                  <small>Hours Online</small>
                </div>
                <div>
                  <CgNotes className="icon"  />
                  <p>13.5</p>
                  <small>Hours Online</small>
                </div>
              </div>
            </div>
          </>
        ):
          <>
            <DriverRideAvailable ride={ride} />
          </>
      }
    </div>
  )
}


export default DriverPage
